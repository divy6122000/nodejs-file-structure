const router = require('express').Router();

const productCtrl = require('../controller/ProductCtrl');
const userCtrl = require('../controller/userCtrl');
const orderCtrl = require('../controller/orderCtrl');

const role = require('../middlewares/role')
const protect = require("../middlewares/jwtAuth");


router.route('/')
	.get(productCtrl.getAllProduct)
	.post(productCtrl.addProduct)

router.route('/order')
	.post(protect,orderCtrl.placeOrder)
	.get(protect,orderCtrl.getAllOrder)

router.route('/cart')
	.get(protect,userCtrl.myCart)

router.route('/:id')
	.get(productCtrl.getProduct)
	.patch(productCtrl.updateProduct)
	.delete(productCtrl.deleteProduct)

router.route('/cart/:id')
	.patch(protect,userCtrl.addCart)
	.delete(protect,userCtrl.removeCart)
//Orders

router.route('/order/:orderId')
	.get(protect,orderCtrl.getOneOrder)
	.delete(protect,orderCtrl.cancelOrder)

router.route('/')
	.post(protect,productCtrl.addProduct)
	

module.exports = router;
