const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name : {
		type : String ,
		required : true
	},
	description : {
		type : String,
		required : true
	},
	productInfo : {
		weight : {
			type : String
		}
	},
	stock : {
		type : String,
		required : true
	},
	images : [{
		type : String
	}]
},{
	timestamps : true
}
);

const Product = mongoose.model('product',productSchema);

module.exports = Product;