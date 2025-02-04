const mysql = require('mysql');
require('dotenv').config();

// local connection placeholders
// update once .env has been created
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'wise_traveler',
});

db.connect(err => {
    if (err) throw err;
    console.log("MySql connected...");
});

module.exports = db;