'use strict'
const conn = require('../Connection/connect')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.forgetPassword = (req, res) => {
    const salt = bcrypt.genSaltSync(7);
    let id = req.body.id
    let password = req.body.newPassword
    let email = ''

    //Ekripsi password baru
    let encryptPassword = bcrypt.hashSync(password, salt);
    console.log(password)
    let sqlSelect = `select * from user where id_user='${id}'`
    let sql = `update user set password='${ encryptPassword }' where id_user=${ id }`

    conn.query(sqlSelect, async (error, rows, results) => {
        //get password lama dan email
        rows.map((item) => {
            (
                email = item.email
            )
        })
        console.log('Melewati ke select email')

        conn.query(sql, (error, rows) =>{
            if (error) {
                console.log(error)
            }else{
            console.log('Melewati update password')
            console.log('password : ' + encryptPassword)
                const user = {
                    email: email,
                    password: encryptPassword
                }
                const token = jwt.sign({ user }, 'privateKey', { expiresIn: '3600s' })
                console.log('Mendapat token')
                res.send({
                    message: "Success get  new password",
                    token,
                })
            }
        })
    
    })
}