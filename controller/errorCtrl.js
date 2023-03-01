const AppError = require('../utils/AppError');

module.exports = (err,req,res,next) => {
  	if(err.code=='11000')
    {
        err = new AppError(`duplicate Key`,400)
    }

   if(!err.statusCode)
   {
        err.statusCode = 500
        err.message = err.message
   }
  // console.log(err)
  	res.status(err.statusCode).json({
  		status : 'fail',
        message : err.message
  	});
 }