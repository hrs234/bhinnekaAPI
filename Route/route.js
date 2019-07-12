'use strict'

module.exports = function (apps) {
    //======================================
    //IMPORT CONTROLLER NAME
    const controler = require('../Controller/productConntroller')
    const cartController = require('../Controller/cartController')
    const userController = require('../Controller/userController')
    const authController = require('../Controller/authController')
    const transactionController = require('../Controller/transactionController')
    const mailerController = require('../Controller/mailerController')
    const forgetController = require('../Controller/forgetController')
    const wishlistController = require('../Controller/wishlistController')
    const mostPopuler = require('../Controller/mostPopuler')
    const searchAll = require('../Controller/searchAll')
    const auth = require('../Middleware/verifytoken')
    const multer = require('multer')

    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });

    let upload = multer({ storage: storage })

    apps.get('/', controler.hello)
    apps.get('/product', controler.getProduct)
    apps.post('/product', upload.single('image'), controler.postImage)
    apps.delete('/product/:id', controler.deleteProduct)
    apps.patch('/product/:id', controler.updateProduct)

    apps.get('/cart/:id', cartController.getCart)
    apps.post('/cart', cartController.postCart)
    apps.delete('/cart/:id', cartController.deleteCart)
    apps.patch('/cart/:id', cartController.updateCart)

    apps.get('/user/:id', userController.getUser)
    apps.post('/user', upload.single('image'), userController.postUser)

    apps.delete('/user/:id', userController.deleteUser)
    apps.patch('/user/:id', userController.updateUser)

    apps.get('/transaction', transactionController.getTransaction)
    apps.post('/transaction', transactionController.postTransaction)
    apps.delete('/transaction', transactionController.deleteTransaction)
    apps.patch('/transaction', transactionController.updateTransaction)

    apps.get('/wishlist', wishlistController.getWishlist)
    apps.post('/wishlist', wishlistController.postWishlist)
    apps.delete('/wishlist/:id', wishlistController.deleteWishlist)

    apps.post('/auth', authController.postAuth)
    apps.patch('/auth/:id', authController.changeAuth)
    apps.post('/upload', upload.single('image'), controler.postImage)

    apps.get('/category', controler.getCategory)
    apps.post('/category', controler.postCategory)

    apps.post('/mail', mailerController)
    apps.patch('/forget', forgetController.forgetPassword)

    apps.patch('/mostPopuler/:id', mostPopuler)
    apps.get('/search', searchAll)
}