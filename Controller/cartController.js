'use strict'
const conn = require('../Connection/connect')
const response = require('../response/response')

exports.getCart = (req, res) => {
    let id = req.params.id
    let sql = `SELECT product.product, cart.id_user, amount_purchase, cart.id_product, price, product.image, id_cart FROM cart join product on cart.id_product = product.id_product join user on cart.id_user = user.id_user where user.id_user = ${id}`
    conn.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            let totalHarga = 0
            let data = rows
            data.map((item) => {(
                totalHarga += (item.price * item.amount_purchase)
            )})
            res.send({
                data: rows,
                totalHarga: totalHarga
            })
        }
    })
}

exports.postCart = (req, res) => {
    let amount_purchase = req.body.amount_purchase
    let id_product = req.body.id_product
    let id_user = req.body.id_user
    let id_productCek = ''
    let firstAmount = ''
    let sqlCheck = `SELECT * FROM cart join product on cart.id_product = product.id_product join user on cart.id_user = user.id_user where user.id_user = ${id_user}`
    let sql = 'insert into cart set amount_purchase=?, id_product=?, id_user=?'

    conn.query(sqlCheck, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            rows.map((item) => {
                (
                    id_productCek = item.id_product
                ),
                    (
                        firstAmount = item.amount_purchase
                    )
            })
            if (id_product == id_productCek) {
                console.log('cek sukses')
                amount_purchase = parseInt(firstAmount) + parseInt(amount_purchase)
                let sqlUpdate = `update cart set amount_purchase = ${amount_purchase} where id_user = ${id_user}`
                conn.query(sqlUpdate, (error, rows) => {
                    if (error) {
                        console.log(error)
                    } else {
                        res.send({
                            data: rows,
                            message: "datahas been saved"
                        })
                    }
                })
            } else {
                console.log('cek error')
                conn.query(sql, [amount_purchase, id_product, id_user], (error, rows) => {
                    if (error) {
                        console.log(error)
                    } else {
                        res.send({
                            data: rows,
                            message: "datahas been saved"
                        })
                    }
                })
            }
        }
    })

}

exports.deleteCart = (req, res) => {
    let id = req.params.id
    let sql = `delete from cart where id_cart = ${id}`

    conn.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            res.send({
                message: "data has been delete"
            })
        }
    })
}

exports.updateCart = (req, res) => {
    let id = req.params.id
    let amount_purchase = req.body.amount_purchase
    let id_product = req.body.id_product
    let id_user = req.body.id_user

    let sql = `update cart set amount_purchase = ${amount_purchase}, id_product = ${id_product}, id_user=${id_user} where id_cart = ${id}`

    conn.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            res.send({
                message: 'data has been update'
            })
        }
    })
}