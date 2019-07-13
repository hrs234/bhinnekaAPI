const conn = require('../Connection/connect')

module.exports = (req,res) => {
    let search = req.query.search
    let sql = `select * from product where product like '%${ search }%'`

    conn.query(sql, (error, rows) => {
        if(error){
            console.log(error)
        } else {
            res.send({
                data: rows,
            })
        }
    })
}