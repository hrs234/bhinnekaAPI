'use strict'

const conn = require('../Connection/connect')
module.exports = (req,res) => {
    let mostClick = 1
    let id = req.params.id
    let sql = `select * from product where id_product = ${id}`
    conn.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            rows.map((item) => {
                (
                    mostClick += item.mostClick
                )
            })
            let sqlMost = `update product set mostClick = ${mostClick} where id_product = ${id}`
            conn.query(sqlMost, (error, rows) => {
                if (error) {
                    console.log(error)
                } else {
                    res.send({
                        data: rows,
                    })
                }
            })
        }
    })
}