const mongooose = require('mongoose');
const fast2sms = require('fast-two-sms');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError')

exports.signUp = async (req, res ,next) => {
    try {
        let user = await User.findOne({
            mobileNumber: req.body.mobileNumber
        });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User exist with this mobile number'
            });
        } else {
            let otp = Math.floor(100000 + Math.random() * 900000);
            let message = `Your OTP is ${otp}`;
            // await fast2sms.sendMessage({
            //     authorization: process.env.OTP_AUTH,
            //     message: `${message}`,
            //     numbers: [req.body.mobileNumber],
            // });
         //   console.log(message)
            const user = await User.create({
                _id: new mongooose.Types.ObjectId(),
                fullName: req.body.fullName,
                mobileNumber: req.body.mobileNumber,
                otp: otp,
                otpExpire: Date.now() + 3600000
            });
            return res.status(201).json({
                success: true,
                message: 'OTP sent successfully',
                userId: user._id,
                otp
            });
        }
    }
    catch (err) {
        console.log(err)
        next(err)
    }
};

exports.login = async (req, res ,next) => {
    try {
        let user = await User.findOne({
            mobileNumber: req.body.mobileNumber
        }).select('otp');
        if (user) {
            let otp = Math.floor(100000 + Math.random() * 900000);
            let message = `Your OTP is ${otp}`;
            // await fast2sms.sendMessage({
            //     authorization: process.env.OTP_AUTH,
            //     message: `${message}`,
            //     numbers: [req.body.mobileNumber],
            // });
            user.otp = otp;
            user.otpExpire = Date.now() + 3600000;
            await user.save();
            return res.status(200).json({
                success: true,
                message: 'Otp sent successfully',
                userId: user._id,
                otp

            });

        } else {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (err) {
        next(err)
    }
}

exports.verifyOtp = async (req, res ,next) => {
    try {
        let user = await User.findOne({
            _id: req.params.userId
           // ,otpExpire: { $gt: Date.now()
             
        }).select('otp');
        if (user) {
            if (user.otp === req.body.otp) {

                user.otp = null;
                user.otpExpire = null;
                await user.save();
                const token = jwt.sign(
                    {
                        mobileNumber: user.mobileNumber,
                        userId: user._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "15d",
                    }
                );
                return res.status(200).json({
                    success: true,
                    message: 'OTP verified successfully',
                    JWT: token
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'OTP expired or invalid',
                    user: user
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            });
        }
    } catch (err) {
        next(err)
    }
}

exports.sendEmailOtp = async (req, res, next) => {
    try {
        if (!req.body.email)
            return next(new AppError('provide email number', 400))

        const user = await User.findOne({email : req.body.email});

        if(!user)
            return next(new AppError('user email not found',404))

        const otp = Math.floor(100000 + Math.random() * 900000);

        //  await sendMail(req.body.email,'Otp is ','WCT otp',otp)

        user.otp = otp;

        await user.save()

        res.status(200).json({
            status : 'success',
            userId : user._id,
            otp
        })
    } catch (err) {
        next(err)
    }
}

exports.resendOtp = async (req, res ,next) => {
    try {
        let user = await User.findOne({
            mobileNumber: req.body.mobileNumber
        });
        if (user) {
            let otp = Math.floor(100000 + Math.random() * 900000);
            let message = `Your OTP is ${otp}`;
            // let data = await fast2sms.sendMessage({
            //     authorization: process.env.OTP_AUTH,
            //     message: `${message}`,
            //     numbers: [user.mobileNumber],
            // });
         //   console.log(data);
        //    if (data) {
                user.otp = otp;
                user.otpExpire = Date.now() + 3600000;
                await user.save();
                return res.status(200).json({
                    success: true,
                    message: 'OTP sent successfully',
                    userId: user._id,
                    otp
                });
            // } else {
            //     return res.status(40).json({
            //         success: false,
            //         message: 'OTP not sent'
            //     });
          //  }
        } else {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (err) {
        next(err)
    }
}


exports.updateProfile = async (req, res ,next) => {
    try {

        if(req.body.dob)
            req.body.dob = `${req.body.dob.month}-${req.body.dob.day}-${req.body.dob.year}`;
        

        let user = await User.findOneAndUpdate({
            _id: req.userId
        },req.body,{
            new : true,
            runValidators : true
        });

        res.status(200).json({
            status : 'success',
            data : {
                user
            }
        })
    } catch (err) {
        return next(err)
    }
}

exports.getProfile = async (req,res,next) => {
    try {
        const userProfile = await User.findById(req.userId);

        if(!userProfile)
            return next(new AppError('no user found',404));

        res.status(200).json({
            status : 'success',
            data : {
                user : userProfile
            }
        })
    } catch(err) {
        next(err)
    }
}
