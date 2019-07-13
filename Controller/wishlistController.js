const conn = require('../Connection/connect');
const isEmpty = require('lodash.isempty')

exports.getWishlist = (req, res) => {
    let id = req.query.id
    let sql = `select * from wishlist join user on user.id_user = wishlist.id_wishlist join product on product.id_product = wishlist.id_product`
    if(!isEmpty(id)){
        sql += `where user.id_user = ${ id }`
    }
    conn.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                data: rows
            })
        }
    })
}

exports.postWishlist = (req, res) => {
    let id_user = req.body.id_user
    let id_category = req.body.id_category

    let sql = `insert into wishlist set id_user = ${id_user}, id_category = ${id_category}`

    conn.query(sql, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `select * from wishlist join user on user.id_user = wishlist.id_user join product on product.id_product = wishlist.id_product where user.id_user = ${id}`
            conn.query(sql, (err, rows) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send({
                        data: rows
                    })
                }
            })
        }
    })
}

exports.deleteWishlist = () => {
    let id = req.params.id
    let id_user = req.body.id_user
    conn.query(`delete from wishlist where id_wishlist = ${id}`, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            let sql = `select * from wishlist join user on user.id_user = wishlist.id_user join product on product.id_product = wishlist.id_product where user.id_user = ${id_user}`
            conn.query(sql, (err, rows) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send({
                        data: rows
                    })
                }
            })
        }
    })
}