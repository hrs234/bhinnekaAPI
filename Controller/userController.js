const isEmpty = require('lodash.isempty');
const Joi = require('joi')
const response = require('../response/response');
const connect = require('../Connection/connect');

exports.getUser = (req,res) =>{
    let id = req.params.id;
    const bearerHeader = req.header('auth');
    console.log(bearerHeader)
    connect.query(`select * from user where id_user = ${id}`, (error, rows) =>{
        if(error){
            console.log(error)
        }else{
            response.fulfield(rows, res)
        }
    }) 
}

exports.postUser = (req,res) =>{
    let password = req.body.password
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email
    let gender = req.body.gender
    let phone_number = req.body.phone_number
    let brith_date = req.body.birth_date
    let sql = 'insert into user set first_name=?, last_name=?, email=?, phone_number=?, gender=?, birth_date=?, password=?'
    connect.query(`${sql}`,[first_name,last_name,email,phone_number,gender,brith_date,password], (error, rows) =>{
        if (error) {
            console.log(error)
        }else{
            connect.query('select * from user order by id_user desc limit 1', (error, row) =>{
                if (error){
                    console.log(error)
                }else{
                    res.send({
                        status:200,
                        data: row
                    })
                }
            })
        }
    })
}

exports.updateUser = (req, res) =>{
    let id = req.params.id
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email
    let gender = req.body.gender
    let phone_number = req.body.phone_number
    let brith_date = req.body.birth_date

    let sql = `update user set first_name = "${first_name}", last_name = "${last_name}", email = "${email}", gender = "${gender}", phone_number = "${phone_number}", birth_date = "${brith_date}" where id_user = ${id}`

    connect.query(sql, (error, rows) =>{
        if (error) {
            console.log(error)
        }else{
            res.send({
                message: "data has been update"
            })
        }
    })
}

exports.deleteUser = (req, res) =>{
    let id = req.params.id
    let sql = `delete from user where id_user = ${id}`

    connect.query(sql, (error, rows) =>{
        if (error) {
            console.log(error)
        }else{
            res.send({
                message:"Data Has Been Delete"
            })
        }
    })
}