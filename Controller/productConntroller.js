'use strict'
const conn = require('../Connection/connect')
const response = require('../response/response')
const cloudinary = require('cloudinary')
const isEmpty = require('lodash.isempty')

exports.hello = (req, res) => {
    conn.query('select * from user', (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            response.fulfield(rows, res);
        }
    })
}

exports.postProduct = async (req, res) => {
    const dataEmpty = () => {
        res
        .status(400)
        .send({
            message: "Data can't be empty"
        })
    }

    if(!req.file){
        dataEmpty()
        return
    }

    let path = req.file.path
    let getUrl = async (req) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })

        let data
        await cloudinary.uploader.upload(path, (result) => {
            const fs = require('fs')
            fs.unlinkSync(path)
            data = result.url
        })
        return data
    }

    let product = req.body.product
    let price = req.body.price
    let description = req.body.description
    let id_user = req.body.id_user
    let id_category = req.body.id_category
    if(!product || !price || !description || !id_user || !id_category){
        dataEmpty()
        return
    }

    let image = await getUrl()
    if(!image){
        dataEmpty()
        return
    }

    let sql = 'insert into product set product=?, price=?, description=?, image=?, id_user=?, id_category=?'

    conn.query(sql, [product, price, description, image, id_user, id_category], (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            conn.query('select * from product order by id_product desc limit 1', (error, row) => {
                if (error) {
                    console.log(error)
                } else {
                    res.send({
                        data: row,
                        message: "data has been save"
                    })
                }
            })
        }
    })


}

exports.getProduct = (req, res) => {

    let category = req.query.category
    let limit = req.query.limit

    let sql = 'select * from product'
    if (isEmpty(category)) {
        sql = sql
        if (isEmpty(limit)){
            sql = sql
        } else {
            sql += `limit = ${ limit }`
        }
    } else {
        sql += ` join category on category.id_category = product.id_category WHERE category.id_category = ${category} `
        if (isEmpty(limit)){
            sql = sql
        } else {
            sql += `limit = ${ limit }`
        }
    }
    conn.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            res.send({
                data: rows,
            })
        }
    })
}

exports.deleteProduct = (req, res) => {
    const dataEmpty = () => {
        res
        .status(400)
        .send({
            message: "Data can't be empty"
        })
    }
    let id = req.params.id
    if(!id){
        dataEmpty()
        return
    }
    let sql = `delete from product where id_product = ${id}`

    conn.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            res.send({
                message: "product has been delete"
            })
        }
    })
}

exports.updateProduct = async (req, res) => {
    const dataEmpty = () => {
        res
        .status(400)
        .send({
            message: "Data can't be empty"
        })
    }

    if(!req.file){
        dataEmpty()
        return
    }

    let path = req.file.path
    let getUrl = async (req) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })

        let data
        await cloudinary.uploader.upload(path, (result) => {
            const fs = require('fs')
            fs.unlinkSync(path)
            data = result.url
        })
        return data
    }

    let id = req.params.id
    let product = req.body.product
    let price = req.body.price
    let description = req.body.description
    let id_user = req.body.id_user
    let id_category = req.body.id_category
    if(!id || !product || !price || !description || !id_user || !id_category){
        dataEmpty()
        console.log('data product')
        return
    }

    let image = await getUrl()
    if(!image){
        dataEmpty()
        return
    }

    let sql = `update product set product= "${product}", price="${price}", description="${description}", image= "${image}", id_user = "${id_user}", id_category = "${id_category}" where id_product = ${id}`

    conn.query(sql, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            res.send({
                message: 'product have been update'
            })
        }
    })


}

exports.postCategory = (req, res) => {
    let category = req.body.category
    conn.query('insert into category set category=?', [category], (error, data) => {
        if (error) {
            console.log(error)
        } else {
            conn.query('select * from category order by id_category desc limit 1', (error, row) => {
                if (error) {
                    console.log(error)
                } else {
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

exports.getCategory = (req, res) => {
    conn.query('select * from category', (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            res.send({
                data: rows,
                message: "data"
            })
        }
    })
}