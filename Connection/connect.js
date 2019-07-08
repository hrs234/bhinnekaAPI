//for connetion api to database
require('dotenv/config')
const mysql = require('mysql')

const connect = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user:process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'notes'
})

connect.connect (function(err){
    if(err){
        throw err;
    }
})

module.exports = connect