const { body, validationResult } = require("express-validator");

const address = () => {
  return [
    body("pincode")
      .notEmpty()
      .withMessage("Pincode is required")
      .isLength({ min: 6 })
      .withMessage("Pincode minimum 6 characters")
      .isLength({ max: 6 })
      .withMessage("Pincode maximum 50 characters"),
    body("state")
      .notEmpty()
      .withMessage("State is required"),
    body("city")
      .notEmpty()
      .withMessage("City is required"),
    body("address")
      .notEmpty()
      .withMessage("Address is required")
      .isLength({ min: 3 })
      .withMessage("address minimum 3 characters")
      .isLength({ max: 300 })
      .withMessage("address maximum 300 characters"),
  ];
};

const validate = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  error.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    error: extractedErrors,
  });
};

module.exports = { address, validate };
