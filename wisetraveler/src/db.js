const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'wise_traveler', // update with actual db name
});

db.connect(err => {
    if (err) throw err;
    console.log("MySql connected...");
});

MediaSourceHandle.exports = db;