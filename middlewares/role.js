const User = require('../model/user');

const AppError = require('../utils/AppError');

module.exports = async (req,res,next) => {
	try {
		const user = await User.findOne({_id : req.userId});
	
		if(!user)
			return next(new AppError('user does not exist',404))	

		if(user.role == 'admin')
			return next();
		else
			return next(new AppError('only admin have access to this route',401));

	} catch(err) {
		next(err)
	}
}