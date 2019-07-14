const conn = require('../Connection/connect');
const isEmpty = require('lodash.isempty')

exports.getWishlist = (req, res) =>{
    let id = req.query.id
    let id_product = req.query.id_product
    let sql = `select id_wishlist, wishlist.id_product, wishlist.id_user, product.image, product.product, product.price  from wishlist join user on user.id_user = wishlist.id_user join product on product.id_product = wishlist.id_product where user.id_user = ${id}`
    
    if(!isEmpty(id_product)){
        sql += ` and wishlist.id_product = ${id_product}`
    }

    conn.query(sql, (err, rows) =>{
        if (err) {
            console.log(err)
        }else{
            let data = rows
            let total = 0
            data.map(item =>{
                total++
            })

            res.send({
                data: rows,
                total: total
            })
        }
    })
}

exports.postWishlist = (req, res) => {
    let id_user = req.body.id_user
    let id_product = req.body.id_product

    let sql = `insert into wishlist set id_user = ${id_user}, id_product = ${id_product}`

    conn.query(sql, (err, row) => {
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