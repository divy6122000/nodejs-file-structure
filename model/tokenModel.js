const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
	accessToken  : {
		type : String,
		require : true
	},
	refreshToken : {
		type : String,
		require : true
	}
})

const Token = mongoose.model('token',tokenSchema)