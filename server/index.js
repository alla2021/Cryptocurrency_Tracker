//----------------------------------------------------------
import fs from 'fs';
const data = 'db.json';

function getDatabase() {
    const database = fs.readFileSync('db.json');
    const data = JSON.parse(database);
    console.log(data, 'data');
    return data;
}

function addNewEmailToDB(email){
    const db= getDatabase();
    db.push(email);
    fs.writeFileSync(data, JSON.stringify(db));
}
function checkEmail(email){
    return getDatabase().find(el => el.email === email);
}

//------------------server--------------------------------
import express from 'express';
import cors from 'cors';
const PORT = 8080;
const app = express();
import bodyParser from "body-parser";
import {reqCurrencyAPI} from "./getRate.js";

app.use(cors());
app.use(express.json())
// app.use(bodyParser.json());

app.post('/subscribe', async (req, res) => {
    const item = req.body
    console.log(item,'dddddd')
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const test = emailRegexp.test(item.email)
    console.log(test,'test')
    if(checkEmail(item.email) === undefined && test === true){
        addNewEmailToDB(item)
        res.json({ status: 'OK. Email was added' })
    }  else {
        test != true ? res.status(401).json({ status: 'error', error: 'Error. Invalid email' }) : res.json({ status: 'error', error: 'Error. Duplicate email' })
    }
})

app.get("/rate", async (req, res) => {
    try {
        let btsRate = await reqCurrencyAPI();
        res.status(200).send({ btc: `${btsRate}` });
    } catch (e) {
        res.status(400).send({ status: "error", error: "Invalid status value" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})