'use strict'

module.exports = function(apps){
    //======================================
    //IMPORT CONTROLLER NAME
    const controler = require('../Controller/productConntroller')
    const cartController = require('../Controller/cartController')
    const userController = require('../Controller/userController')
    const authController = require('../Controller/authController')
    const transactionController = require('../Controller/transactionController')
    const mailerController = require('../Controller/mailerController')
    const forgetController = require('../Controller/forgetController')
    const auth = require('../Middleware/verifytoken')

    //BELUM DITAMBAHKAN MIDDLEWARE (auth)
    apps.get('/',controler.hello)
    apps.get('/product',controler.getProduct)
    apps.post('/product',controler.postProduct)
    apps.delete('/product/:id',controler.deleteProduct)
    apps.patch('/product/:id',controler.updateProduct)

    apps.get('/cart/:id',cartController.getCart)
    apps.post('/cart',cartController.postCart)
    apps.delete('/cart/:id', cartController.deleteCart)
    apps.patch('/cart/:id',cartController.updateCart)

    apps.get('/user/:id',auth, userController.getUser)
    apps.post('/user', userController.postUser)
    apps.delete('/user/:id', userController.deleteUser)
    apps.patch('/user/:id', userController.updateUser)

    apps.get('/transaction/:id',transactionController.getTransaction)
    apps.post('/transaction',transactionController.postTransaction)

    apps.post('/auth',authController.postAuth)
    apps.patch('/auth/:id',authController.changeAuth)

    apps.get('/category', controler.getCategory)
    apps.post('/category', controler.postCategory)

    apps.get('/mail', mailerController)
    apps.patch('/forget/:id', forgetController.forgetPassword)
    

}