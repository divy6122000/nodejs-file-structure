const mongooose = require("mongoose");
const Address = require("../model/address");
const User = require("../model/user");


exports.postAddress = async (req, res ,next) => {
  try {
    const user = await Address.create({userId : req.userId , ...req.body});

    res.status(201).json({
      status : 'success',
      message : "Address added"
    })
  } catch(err) {
    next(err)
  }
};


exports.getAddress = async (req, res ,next) => {
  try {
    const address = await Address.find({
      userId: req.userId,
    });
    if (address) {
      return res.status(200).json({
        success: true,
        data : {
          no_of_address : address.length
          ,address
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
  } catch(err) {
    next(err)
  }
};


exports.putAddress = async (req, res ,next) => {
  try {
      const user = await Address.findOneAndUpdate({_id : req.params._id },req.body,{
        new : true
      });

      res.status(200).json({
        status : 'success',
        data : {
          user
        }
      })
  } catch(err) {
    next(err)
  }
};


exports.deleteAddress = async (req, res ,next) => {
    try {
        const user = await User.findOne({
            userId: req.userId,
        });
        if (user) {
            const address = await Address.findOne({
                _id: req.params.userId,
            });
            if (address) {
                await address.remove();
                return res.status(200).json({
                    success: true,
                    message: "Address deleted successfully",
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Address not found",
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    } catch(err) {
        next(err)
    }
}