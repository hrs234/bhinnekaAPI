'use strict'
const conn = require('../Connection/connect')
const response = require('../response/response')

exports.hello = (req,res) =>{   
    conn.query('select * from note', (error, rows) =>{
        if (error) {
            console.log(error)                                                                                                                                                                                                                            
        }else {
            response.fulfield(rows, res);
        }
    })
}