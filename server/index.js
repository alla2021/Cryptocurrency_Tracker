//------------------server--------------------------------
import express from 'express';
import cors from 'cors';
const PORT = 8080;
const app = express();
import {reqCurrencyBTC} from "./getRate.js";
import {addNewEmailToDB, checkEmail} from "./saveEmailToBD.js";
import {sendEmailSubscriptions} from "./sendEmail.js";

app.use(cors());
app.use(express.json())

app.post('/subscribe', async (req, res) => {
    const item = req.body
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const test = emailRegexp.test(item.email)
    if(checkEmail(item.email) === undefined && test === true){
        addNewEmailToDB(item)
        res.json({ status: 'OK. Email was added' })
    }  else {
        test != true ? res.status(401).json({ status: 'error', error: 'Error. Invalid email' }) : res.json({ status: 'error', error: 'Error. Duplicate email' })
    }
})

app.get("/rate", async (req, res) => {
    try {
        let btsRate = await reqCurrencyBTC();
        res.status(200).send({ btc: `${btsRate}` });
    } catch (e) {
        res.status(400).send({ status: "error", error: "Invalid status value" });
    }
});

app.post("/sendEmails", async (req, res) =>{
    await sendEmailSubscriptions().catch(console.error);
    res.status(200).json({ description: "Email was sent " });
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})