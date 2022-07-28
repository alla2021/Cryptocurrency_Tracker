//----------------------------------------------------------
import fs from 'fs';
const data = 'db.json';

export function getDatabase() {
    const database = fs.readFileSync('db.json');
    const data = JSON.parse(database);
    return data;
}

export function addNewEmailToDB(email){
    const db= getDatabase();
    db.push(email);
    fs.writeFileSync(data, JSON.stringify(db));
}
export function checkEmail(email){
    return getDatabase().find(el => el.email === email);
}
