//-----------------------save fs-----------------------------------
var fs = require('fs');
const data = 'db.json'

function getDatabase() {
    const database = fs.readFileSync('data.json')
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
var cors = require('cors')
const PORT = 5000;

const app = express();
app.use(cors())
app.use(express.json())

app.post('/subscribe', async (req, res) => {
    const item = req.body
    if(checkEmail(item.email) === undefined){
        addNewEmailToDB(item)
        res.json({ status: 'OK. Email was added' })
    } else {
        res.json({ status: 'error', error: 'Error. Duplicate email' })
    }
})



app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})