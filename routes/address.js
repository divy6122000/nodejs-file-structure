const express = require("express");
const router = express.Router();
const addressController = require("../controller/address");
const auth = require("../middlewares/jwtAuth");
const validator = require("../middlewares/addressAuth");


router.post("/",auth, addressController.postAddress);

router.put("/:userId",auth,validator.validate,addressController.putAddress);

router.get("/",auth,addressController.getAddress);

router.delete("/:userId",auth,addressController.deleteAddress);

module.exports = router;