'use strict'
const conn = require('../Connection/connect')
const response = require('../response/response')

exports.hello = (req,res) =>{   
    conn.query('select * from user', (error, rows) =>{
        if (error) {
            console.log(error)                                                                                                                                                                                                                            
        }else {
            response.fulfield(rows, res);
        }
    })
}

exports.postProduct = (req,res) => {
    let product = req.body.product
    let price = req.body.price
    let description = req.body.description
    let image = req.body.image
    let id_user = req.body.id_user
    let id_category = req.body.id_category

    let sql = 'insert into product set product=?, price=?, description=?, image=?, id_user=?, id_category=?'

    conn.query(sql,[product,price,description,image,id_user,id_category], (error, rows) =>{
        if (error) {
            console.log(error)
        }else{
            conn.query('select * from product order by id_product limit 1', (error, row) =>{
                if (error) {
                    console.log(error)
                }else{
                    res.send({
                        data:row,
                        message:"data has been save"
                    })
                }
            })
        }
    })

}

exports.getProduct = (req,res) =>{
    let sql = 'select * from product' 
    conn.query(sql, (error, rows )=> {
        if (error) {
            console.log(error)
        }else{
            res.send({
                data: rows,
                message: 'try',
                prodak: rows.id
            })
            let data = rows
            let user = ''
            console.log(rows)
            data.map((item)=>{
                user = item.product
            })

            console.log(user)
        }
    })
}

exports.deleteProduct = (req,res) =>{
    let id = req.params.id
    let sql = `delete from product where id_product = ${id}`

    conn.query(sql, (error, rows) =>{
        if (error) {
            console.log(error)
        }else{
            res.send({
                message: "product has been delete"
            })
        }
    })
}

exports.updateProduct = (req,res) =>{
    let id = req.params.id
    let product = req.body.product
    let price = req.body.price
    let description = req.body.description
    let image = req.body.image
    let id_user = req.body.id_user
    let id_category = req.body.id_category

    let sql = `update product set product= "${product}", price="${price}", description="${description}", image= "${image}", id_user = "${id_user}", id_category = "${id_category}" where id_product = ${id}`

    conn.query(sql, (error, rows) =>{
        if (error) {
            console.log(error)
        }else{
            res.send({
                message: 'product have been update'
            })
        }
    })


}

exports.postCategory = (req, res) =>{
    let category = req.body.category
    conn.query('insert into category set category=?',[category], (error, data) =>{
        if (error) {
            console.log(error)
        }else{
            conn.query('select * from category order by id_category desc limit 1', (error, row) =>{
               if (error) {
                   console.log(error)
               }else{
                res.send({
                    data: row,
                    status: 200,
                    message: "category has been saved!"
                })
               }
            })
        }
    })
}

exports.getCategory = (req,res) =>{
    conn.query('select * from category', (error, rows) =>{
        if (error) {
            console.log(error)
        }else{
            res.send({
                data: rows,
                message: "data"
            })
        }
    })
}