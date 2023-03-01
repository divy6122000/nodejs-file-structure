const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userId : {
		type : mongoose.Schema.ObjectId,
		ref : 'user',
		required : true
	},
	productId : {
		type : mongoose.Schema.ObjectId,
		ref : 'product',
		required : true
	},
	qty : {
		type : Number,
		required : true
	},
	productPrice : {
		type : Number,
		required : true	
	},
	totalPrice : {
		type : Number,
		required : true		
	}},
	{
		timestamps : true
	} 
);

const Order = mongoose.model('order',orderSchema);

module.exports = Order;