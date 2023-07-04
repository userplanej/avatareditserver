const {check, validationResult} = require('express-validator');

exports.validateProductRequest = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty(),
  check('email')
    .isEmail(),
  check('price')
    .not()
    .isEmpty(),
  check('storage_method')
    .not()
    .isEmpty(),
  check('order_type')
    .not()
    .isEmpty(),
  check('ingredients')
    .not()
    .isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({errors: errors.array()});
    next();
  },
];