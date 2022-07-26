//-----------------------save fs-----------------------------------
var fs = require('fs');
const data = 'db.json'

function getDatabase() {
    const database = fs.readFileSync('db.json')
    const data = JSON.parse(database)
    console.log(data, 'data')
    return data
}

function addNewEmailToDB(email){
    const db= getDatabase()
    db.push(email)
    fs.writeFileSync(data, JSON.stringify(db))
}
function checkEmail(email){
    return getDatabase().find(el => el.email === email)
}

//------------------server--------------------------------
const express = require('express')
const axios = require('axios');
var cors = require('cors')
const PORT = 8080;
const URL_CRYP ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=UAH&order=market_cap_desc&per_page=1&page=1&sparkline=false';
const app = express();
app.use(cors())
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

app.get('/rate',async (req,res)=>{
    let btsCurrent = console.log(await reqCurrencyAPI (),'s33333ss');
    try{
        res.status(200).json({ status: 'OK.' })
    }
    catch (e){
        res.status(401).json({status: 'error'})
    }
})

async function reqCurrencyAPI () {
    let currency = null;
    const dataCurrency = await axios.get(URL_CRYP).then(res => {
        currency = res.data[0].current_price
    })
        .catch(error => {
            console.log(error);
        });

    return currency;
}


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})