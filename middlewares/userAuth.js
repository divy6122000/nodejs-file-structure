const {body, validationResult} = require('express-validator');


const signUpVerify = () => {
  return [
  body('mobileNumber')
          .notEmpty()
          .withMessage('Mobile Number is required')
          .isNumeric()
          .withMessage('Mobile Number should be Numeric')
          .isLength({ min:10, max:10 })
          .withMessage('Mobile Number 10 digits required'),
      body('fullName')
          .notEmpty()
          .withMessage('User Name is required')
          .isLength({min: 3})
          .withMessage('User Name minimum 3 characters')   
          .isLength({ max: 50})
          .withMessage('User Name maximum 50 characters')
      
    ]
}

const mobileNumberVerify = () => {
  return [
    body('mobileNumber')
          .notEmpty()
          .withMessage('Mobile Number is required')
          .isNumeric()
          .withMessage('Mobile Number should be Numeric')
          .isLength({ min:10, max:10 })
          .withMessage('Mobile Number 10 digits required')
        ]
}

const otpVerify = () => {
  return[
    body('otp')
    .notEmpty()
    .withMessage('OTP is required')
    .isNumeric()
    .withMessage('OTP should be Number')
    .isLength({min:6, max:6})
    .withMessage('OTP reuqires 6 digits'),
  ]
}


const validate = (req, res, next) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    error.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      error: extractedErrors,
    })
  }


  module.exports = {signUpVerify,otpVerify,validate,mobileNumberVerify}