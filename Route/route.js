'use strict'

module.exports = function(apps){
    //======================================
    //IMPORT CONTROLLER NAME
    const controler = require('../Controller/productConntroller')
    const cartController = require('../Controller/cartController')
    const userController = require('../Controller/userController')
    const authController = require('../Controller/authController')
    const transactionController = require('../Controller/transactionController')
    const multer = require('multer')

    const storage = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null,'./uploads');
        },
        filename: function(req, file, callback){
            callback(null,file.originalname);
        }
    });

    let upload = multer({storage: storage})

    apps.get('/',controler.hello)
    apps.get('/product',controler.getProduct)
    apps.post('/product',upload.single('image'), controler.postImage)
    apps.delete('/product/:id',controler.deleteProduct)
    apps.patch('/product/:id',controler.updateProduct)

    apps.get('/cart/:id',cartController.getCart)
    apps.post('/cart',cartController.postCart)
    apps.delete('/cart/:id', cartController.deleteCart)
    apps.patch('/cart/:id',cartController.updateCart)

    apps.get('/user/:id', userController.getUser)
    apps.post('/user', upload.single('image'),userController.postUser)
    apps.delete('/user/:id', userController.deleteUser)
    apps.patch('/user/:id', userController.updateUser)

    apps.get('/transaction/:id',transactionController.getTransaction)
    apps.post('/transaction',transactionController.postTransaction)
    apps.delete('/transaction', transactionController.deleteTransaction)
    apps.patch('/transaction', transactionController.updateTransaction)

    // apps.get('./auth',authController.auth)
    apps.post('/upload',upload.single('image'), controler.postImage)

    apps.get('/category', controler.getCategory)
    apps.post('/category', controler.postCategory)

    apps.post('/mutler',controler.postImage)

    

}