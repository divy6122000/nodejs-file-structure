const express = require("express");
const router = express.Router();
const userController = require("../controller/userAuth");
const userCtrl = require('../controller/userCtrl')
const auth = require("../middlewares/jwtAuth");
const validator = require("../middlewares/userAuth");


router.post("/signup",validator.signUpVerify(),validator.validate, userController.signUp);

router.post('/signup/email',userController.sendEmailOtp)

router.put("/verifyOtp/:userId",validator.otpVerify(),validator.validate,userController.verifyOtp);

router.put("/resendotp",validator.mobileNumberVerify(),validator.validate,userController.resendOtp);

router.put("/updateProfile",auth,userController.updateProfile);

router.post("/login",validator.mobileNumberVerify(),validator.validate,userController.login);

router.post('/CostomerSupport',auth,userCtrl.CostomerSupport)

router.get('/myprofile',auth,userCtrl.myProfile)


module.exports = router;
