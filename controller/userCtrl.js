const Query = require('../model/CostomerSupport.model');
const Product = require('../model/product.model');
const User = require('../model/user');

const obId = require('mongoose').Types.ObjectId;


const AppError = require('../utils/AppError')

exports.CostomerSupport = async (req,res,next) => {
try{	const query = req.body;

	await Query.create(query);

	res.status(200).json({
		status : 'Success',
		message : 'query added successfully'
	})} catch (err) {
		next(err)
	}
}

exports.addCart = async (req,res,next) => {
	try{
		const productId = req.params.id;
	
		if(!productId)
			return next(new AppError('prodvide productId',400))
	
		await User.findByIdAndUpdate(req.userId,{
			$addToSet : {
				cart : productId
			}
		})
	
		res.status(200).json({
			status : 'Success',
			message : 'product added to cart successfully'
		})} catch(err) {
			next(err)
		}
}

exports.removeCart = async (req,res,next) => {
	try
	{	
	const productId = req.params.id;

	if(!productId)
		return next(new AppError('prodvide productId',400))

	if(!obId.isValid(productId))
			return next(new AppError('invalid Product Id',400));

	await User.upadteOne({_id : req.userId},{
		$pullAll:{
			cart : [productId]
		}
	})

	res.status(204).json({
		status : 'deleted',
		message : 'product removed from cart successfully'
	})} catch(err) {
		next(err)
	}
}

exports.myCart = async (req,res,next) => {
	try {
		const cart = await User.findOne({_id : req.userId}).select('cart').populate('cart');

		if(!cart)
			return next(new AppError('no items in cart',404))

		res.status(200).json({
			status : 'success',
			data : {
				no_of_carts : cart.cart.length,
				cart : cart.cart
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.myProfile =  async(req,res,next) => {
	try {
		const user = await User.findOne({_id : req.userId})

		if(!user)
			return next(new AppError('no user found',404))

		res.status(200).json({
			status : 'success',
			data : {
				user
			}
		})
	} catch(err) {
		next(err)
	}
}