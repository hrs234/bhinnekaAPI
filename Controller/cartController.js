'use strict'
const conn = require('../Connection/connect')
const response = require('../response/response')

exports.getCart = (req,res) =>{
    let id = req.params.id
    let sql = `SELECT * FROM cart join product on cart.id_product = product.id_product join user on cart.id_user = user.id_user where user.id_user = ${id}`
    conn.query(sql,(error, rows) =>{
        if (error) {
            console.log(error)
        }else{
            res.send({
                data:rows
            })
        }
    }) 
}

exports.postCart = (req,res) =>{
    let amount_purchase = req.body.amount_purchase
    let id_product = req.body.id_product
    let id_user = req.body.id_user
    let sql = 'insert into cart set amount_purchase=?, id_product=?, id_user=?'
    conn.query(sql,[amount_purchase,id_product,id_user],(error, rows) =>{
        if (error) {
            console.log(error)
        }else{
            res.send({
                data:rows,
                message: "datahas been saved"
            })
        }
    })
}

exports.deleteCart = (req,res) =>{
    let id = req.params.id
    let sql = `delete from cart where id_cart = ${id}`

    conn.query(sql, (error, rows) =>{
        if (error) {
            console.log(error)
        }else{
            res.send({
                message: "data has been delete"
            })
        }
    })
}

exports.updateCart = (req,res) =>{
    let id = req.params.id
    let amount_purchase = req.body.amount_purchase
    let id_product = req.body.id_product
    let id_user = req.body.id_user

    let sql = `update cart set amount_purchase = ${amount_purchase}, id_product = ${id_product}, id_user=${id_user} where id_cart = ${id}`

    conn.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        }else{
            res.send({
                message: 'data has been update'
            })
        }
    })
}