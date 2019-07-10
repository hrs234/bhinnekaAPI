'use strict'
const conn = require('../Connection/connect')
const response = require('../response/response')
const jwt = require('jsonwebtoken')

exports.postAuth = (req, res) =>{
    let email = req.body.email
    let password = req.body.password
    let sql = `select * from user where email='${email}' AND password='${password}'`
    const user = {
        email: email,
        password: password
    }
    if (email && password){
        conn.query(sql,(error, rows, results) =>{
            if (rows.length  > 0){
                const token = jwt.sign({user}, 'privateKey', {expiresIn:'3600s'})
                res.send({
                    rows,
                    token,
                })
            } else {
                res.send('Incorrect Email and Password')
            }
        }) 
    } else {
        res.send('Please enter Email and Password')
    }
}