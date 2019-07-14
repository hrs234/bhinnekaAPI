'use strict'
const conn = require('../Connection/connect')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(7);

exports.postAuth = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let verifPass = ''
    let id

    const dataEmpty = () => {
        res
        .status(400)
        .send({
            message: "Data can't be empty"
        })
    }

    if(!email || !password){
        dataEmpty()
    }

    let sql = `select * from user where email='${email}'`
    const user = {
        email: email,
        password: password
    }
    console.log(email + password)
    conn.query(sql, async (error, rows, results) => {
        rows.map((item) => {
            (
                verifPass = item.password
            )
        })
        let decrypt = await bcrypt.compare(password, verifPass)
        console.log(verifPass)
        console.log(decrypt)
        if (decrypt) {
            const token = jwt.sign({ user }, 'privateKey', { expiresIn: '3600s' })
            rows.map((item) => {
                (
                    id = item.id_user
                )
            })
            console.log(id)
            id = id.toString()
            res.send({
                message: 'login succes',
                id,
                token,
            })
        } else {
            res.send({message: 'Incorrect Email and Password'})
        }
    })
}

exports.changeAuth = (req, res) => {
    let id = req.params.id
    let password = req.body.oldPassword
    let changePassword = req.body.newPassword
    let verifPass = ''
    let email = ''

    const dataEmpty = () => {
        res
        .status(400)
        .send({
            message: "Data can't be empty"
        })
    }

    if(!id || !password || !changePassword){
        dataEmpty()
    }

    //Ekripsi password baru
    let encryptPassword = bcrypt.hashSync(changePassword, salt);
    console.log(changePassword)
    let sqlSelect = `select * from user where id_user='${id}'`
    let sql = `update user set password='${ encryptPassword }' where id_user=${ id }`

    conn.query(sqlSelect, async (error, rows, results) => {
        //get password lama
        rows.map((item) => {
            (
                verifPass = item.password
            ),
            (
                email = item.email
            )
        })
        console.log('Melewati ke select password')
        //validasi password lama
        let decrypt = await bcrypt.compare(password, verifPass)
        console.log(password + decrypt)
        //jika password terverifikasi
        if (decrypt) {
            console.log('Melewati decode password')
            conn.query(sql, (error, rows) =>{
                if (error) {
                    console.log(error)
                }else{
                console.log('Melewati update password')
                    const user = {
                        email: email,
                        password: encryptPassword
                    }
                    const token = jwt.sign({ user }, 'privateKey', { expiresIn: '3600s' })
                    console.log('Mendapat token')
                    res.send({
                        message: "Success change password",
                        token,
                    })
                }
            })
        } else {
            res.send({message:'Incorrect Email and Password'})
        }
    })
}