'use strict'
const conn = require('../Connection/connect')
const response = require('../response/response')
const isEmpty = require('lodash.isempty')

exports.getTransaction = (req, res) => {
    let id = req.query.id
    let id_role = req.query.id_role
    let sql = `SELECT * FROM transaction join product on product.id_product = transaction.id_product join user on user.id_user = transaction.id_user join payment_role on payment_role.id__role = transaction.id_role join transaction_methode on transaction.id_buy_methode = transaction_methode.id_buy_methode`

    if (!isEmpty(id)) {
        sql += ` where transaction.id_user = ${id}`
        if (!isEmpty(id_role)) {
            sql += ` and transaction.id_role = ${id_role}`
        }
    }

    console.log(sql)

    conn.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            let totalHarga = 0
            let data = rows
            data.map((item) => {(
                totalHarga += item.price
            )})
            res.send({
                data: rows,
                totalharga: totalHarga
            })
        }
    })
}

exports.postTransaction = (req, res) => {
    let id_buy_methode = req.body.id_buy_methode
    let id_product = req.body.id_product
    let id_user = req.body.id_user
    let id_role = req.body.id_role
    let id_address = req.body.id_address
    let id_agent = req.body.id_address

    let sql = `insert into transaction set id_buy_methode = ?, id_product = ?, id_user = ?, id_role = ?, id_agent=?, id_address=?`

    let defSql = `SELECT * FROM transaction join product on product.id_product = transaction.id_product join user on user.id_user = transaction.id_user join payment_role on payment_role.id__role = transaction.id_role join transaction_methode on transaction.id_buy_methode = transaction_methode.id_buy_methode join address on address.id_address = transaction.id_address order by user.id_user desc limit 1`

    conn.query(sql, [id_buy_methode, id_product, id_user, id_role, id_agent, id_address], (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            conn.query(defSql, (error, row) => {
                if (error) {
                    console.log(error)
                } else {
                    res.send({
                        data: row
                    })
                }
            })
        }
    })

}

exports.deleteTransaction = (req, res) => {
    let id = req.params.id
    conn.query(`delete from transaction where id_transaction = ${id}`, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            res.send({
                message: "transaction has been delete"
            })
        }
    })
}

exports.updateTransaction = (req, res) => {
    let id = req.params.id
    let id_buy_methode = req.body.id_buy_methode
    let id_product = req.body.id_product
    let id_user = req.body.id_user
    let id_role = req.body.id_role

    let sql = `update transaction set id_buy_methode=${id_buy_methode}, id_product = ${id_product}, id_user = ${id_user}, id_role = ${id_role} where id_transaction = ${id} `

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