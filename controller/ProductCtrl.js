const Product = require('../model/product.model');
const obId = require('mongoose').Types.ObjectId;
const axios = require('axios')

const AppError = require('../utils/AppError')

const baseUrl = 'https://api-preprod.ailiens.com'

// exports.getProduct = async (req,res,next) => {
// 	try {
// 		const id = req.params.id

// 		const data = JSON.stringify({
// 		  "styleId": id
// 		});

// 		const config = {
// 		  method: 'post',
// 		  url: `${baseUrl}/d/api/product/details`,
// 		  headers: { 
// 		    'content-type': 'application/json', 
// 		    'module': ' odin'
// 		  },
// 		  data : data
// 		};

// 		let result = await axios(config)

// 		result = result.data.data.mainStyle

// 		res.status(200).json(result)

// 	} catch (err) {
// 		if(err.response.status)
// 			return	res.status(err.response.status).json({
// 				status : 'failed',
// 				message : err.response.statusText
// 			})
// 		next(err);
// 	}
// }

// exports.getAllProduct = async (req ,res ,next) => {
// 	try {
// 		const url = baseUrl + '/d/apiV2/listing/products';

// 		const page = req.query.page || 1

// 		let result = await axios({
// 		  		method: 'post',
// 		 		 url: 'https://api-preprod.ailiens.com/d/apiV2/listing/products',
// 		  			headers: { 
// 		   			 'content-type': 'application/json', 
// 		   			 'module': ' odin'
// 		 		 },
// 		 		 data : {
// 		 		 "deeplinkurl": `/products?p=${page}`
// 				}
// 			})
// 		result = result.data.data

// 		if(!result.styles.styleList[0])
// 			return next(new AppError('page not found',404))

// 		res.status(200).json((result))
// 	} catch (err) {
// 		console.log(err)
// 		next(err);
// 	}
// }

exports.findStore = async (req,res,next) => {
	try {
		const data = JSON.stringify({
		  "location": "560025",
		  "coordinates": {
		    "latitude": "",
		    "longitude": ""
		  },
		  "onlyEnabled": "",
		  "onlyStoreLocatorEnabled": "",
		  "brands": []
		});

		const config = {
		  method: 'post',
		  url: 'https://api-preprod.ailiens.com/b/namo/api/v1/order/storeLocator',
		  headers: { 
		    'Content-Type': 'application/json', 
		    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJlbWFpbF9pZCI6ImRlbW9AdXNlci5jb20iLCJsYXN0TmFtZSI6IiIsInNlc3Npb24iOiJjMTlhMWJiMy04OTBhLTRlMmEtOTZlNS1hOWJhNGMzODA5YTQiLCJhc3NvY2lhdGVkU3RvcmVJZHMiOltdLCJyb2xlcyI6WyJST0xFX09NU19PUkdBRE1JTiIsIlJPTEVfQUlMX1NUQUZGIiwiUk9MRV9MTVNfT1JHQURNSU4iLCJST0xFX0JVU0lORVNTX1VTRVIiLCJERUZFTkRFUlNfQURNSU4iXSwiaXNzIjoiYmxhY2tib2x0IiwidHlwIjoiQmVhcmVyIiwiYXVkIjoib2RpbiIsImZpcnN0TmFtZSI6ImRlbW8iLCJ1c2VyX2lkIjoiODdmYWM1MDMtYTMxOC00OTI3LTk1ZDctMzU0MDc3NTU1YmZiIiwidGVuYW50SWQiOiJiODdjYWRkMS00NWRiLTRlNTktYjVhOS0yYzc0NjI3MWJmNGIiLCJtaWRkbGVOYW1lIjoiIiwiZXhwIjoxNjQ2OTE4OTUyLCJpYXQiOjE2NDY5MTcxNTIsImp0aSI6IjllOTM4NDY3LTg5OTAtNDU5YS1hZjU0LTBmZGZjOWU3MDY0OSJ9.cBrhVPztuXwT0u3PHTSjBaKEyRBNYBWdnt9qNnUvcdTlwS-xRYmGI2lr4OI7-RhQ0uV-0qhB2xUzG1FINGnW-BQlabFZNhYpZ4fMNUP5sntbu4Pdirhii8lgoJQW-X5hv_yxvqDyCz9HiixIdOxqHttro_kLzg8r1rI6VsnBVSirfSaM2qhtzi9YBQZcIT86-CRqQYTfxVaw6sx60JT-SR3rRhVttC1HK9hv2RDI2CGUV_BTanVMhfNy0SX3a3XP3kNcHrLhhyK8ZdN3-kj5aak7jxKdJdszLbJgCPg8c8zwCnvAQMw47iaOMI3DUfa2O7unv4vwz3cKTcMkbKFhLg'
		  },
		  data : data
		};

		let result = await axios(config);

		result = result.data

		res.status(200).json({
			result : result
		})
	} catch(err) {
		next(err)
	}
}

exports.addProduct = async (req,res,next) => {
	try {
		const prod = await Product.create(req.body);

		res.status(201).json({
			status : 'success',
			data : {
				product : prod
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.getAllProduct = async (req,res,next) => {
	try {
		const prod = await Product.find()

		res.status(200).json({
			status : 'success',
			data : {
				no_of_products : prod.length,
				products : prod
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.getProduct = async (req,res,next) => {
	try {
		const prod = await Product.findOne({_id : req.params.id});

		if(!prod)
			return next(new AppError('product not found',404))

		res.status(200).json({
			status : 'success',
			data : {
				product : prod
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.updateProduct = async (req,res,next) => {
	try {
		const prod = await Product.findOneAndUpdate({_id : req.params.id},req.body,{
			new : true,
			runValidators : true
		});

		if(!prod)
			return next(new AppError('product not found',404))

		res.status(200).json({
			status : 'success',
			data : {
				message : 'updated',
				product : prod
			}
		})
	} catch(err) {
		next(err)
	}
}

exports.deleteProduct = async (req,res,next) =>{
	try {
		const prod = await Product.findOneAndDelete({_id : req.params.id});

		res.status(204).json({
			status
		})
	} catch(err) {
		next(err)
	}
}