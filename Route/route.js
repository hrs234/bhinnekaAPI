'use strict'

module.exports = function(apps){
    //======================================
    //IMPORT CONTROLLER NAME
    const controler = require('../Controller/productConntroller')
    const cartController = require('../Controller/cartController')
    const userController = require('../Controller/userController')
    const authController = require('../Controller/authController')

    apps.get('/',controler.hello)
    // apps.get('/product',controler.product)
    // apps.post('/product',controller.postProduct)
    // apps.delete('/pruduct/:id',controler.deleteProduct)
    // apps.patch('/pruduct/:id',controler.updateProduct)

    // apps.get('/cart',cartController.cart)
    // apps.post('/cart',cartController.postCart)
    // apps.delete('/cart/:id', cartController.deleteCart)
    // apps.patch('/cart/:id',cartController.updateCart)

    // apps.get('./user', userController.getUser)
    // apps.post('/user', userController.postUser)
    // apps.delete('/user/:id', userController.deleteUser)
    // apps.patch('/user/:id', userController.updateUser)

    // apps.get('./auth',authController.auth)
    

}