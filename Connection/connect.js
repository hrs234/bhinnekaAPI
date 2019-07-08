require('dotenv/config');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host :  'remotemysql.com',
    user : 'MBG4wcGA5t',
    password : 'Hk3n35oPfP',
    database : 'MBG4wcGA5t',
})

conn.connect (function(err){
    if(err) throw err;
})

module.exports = conn;