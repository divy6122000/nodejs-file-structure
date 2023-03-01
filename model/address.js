const mongoose = require("mongoose");

const adressSchema = mongoose.Schema({
  fullName : {
  	type : String,
  	required : [true,'fullName is required']
  },
  mobileNumber : {
  	type : String,
  	min : [10,'enter valid phone number'],
  	required : [true,'mobileNumber is required field']
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  state: { type: String, required: true },
  landMark : {
  	type : String,
  	default : ''
  }
},
{
  timestamps : true
});

module.exports = mongoose.model("address", adressSchema);
