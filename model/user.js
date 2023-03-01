const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String ,
        default : ''
    },
    mobileNumber: { 
        type: String,
        default : ''
    },
    pincode: { 
        type: String 
    },
    dob: { 
        type: Date 
    },
    otp: { 
        type: String ,
        select : false,
        default : 0
    },
    otpExpire: Date,
    createdAt: { 
        type: Date,
         default: Date.now
    },
    cart : [String],
    address : [{
        type : String        
    }],
    role : {
        type : String,
        default : 'user'
    }
},
{
    timestamps : true
}
);


module.exports = mongoose.model('user', userSchema);