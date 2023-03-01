
const Order = require('../model/order.model');
const obId = require('mongoose').Types.ObjectId;

const AppError = require('../utils/AppError')

exports.placeOrder = async (req,res,next) => {
	try {
		if(!obId.isValid(req.body.productIdn))
			return next(new AppError('invalid Product Id',400));

		const ord = {...req.body , userId : req.userId};

		await Order.create(ord);

		res.status(200).json({
			status : 'Success',
		})
	} catch (err) {
		next(err)
	}
}

exports.getAllOrder = async (req,res,next) => {
	try {
		const orders = await Order.find();


		if(!orders[0])
			return next(new AppError('no orders found',404));

		res.status(200).json({
			status : 'Success',
			data : {
				no_of_orders : orders.length,
				orders
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.getOneOrder = async (req,res,next) => {
	try {
		const oid = req.params.orderId;

		if(!obId.isValid(oid))
			return next(new AppError('invalid Product Id',400));

		const order = await Order.findOne({$and : [{_id : oid},{userId : req.userId}]}).populate('productId')

		if(!order)
			return next(new AppError('no order found',404))

		res.status(200).json({
			status : 'Success',
			data : {
				order
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.cancelOrder = async (req,res,next) => {
	try {
		const oid = req.params.orderId;

		if(!obId.isValid(oid))
			return next(new AppError('invalid Product Id',400));


		await Order.findByIdAndDelete(oid);

		res.status(204).json({
			status : 'Success',
			message : 'Order Canceled '
		})
	} catch (err) {
		next(err)
	}
}