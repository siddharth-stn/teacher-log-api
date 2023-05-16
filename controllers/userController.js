const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.user_list = async (req, res, next) => {
  if (req.user.isAdmin === true) {
    try {
      const users = await User.find({ isAdmin: true });
      if (users.length === 0) {
        res.json("No teacher in the database");
      } else {
        users.forEach((element) => {
          element.password = "";
        });
        res.send(users);
      }
    } catch (error) {
      return next(error);
    }
  }
};

exports.user_create = [
  // Validate and sanitize fields
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter Valid email address")
    .escape(),
  body("password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s).{8,16}$/)
    .withMessage(
      "Password must be 8 to 16 characters long and it must contain at least one small case letter, one upper case letter, one number, and one special character"
    )
    .escape(),
  async (req, res, next) => {
    if (req.user.isAdmin === true) {
      // Extract the validation errors from a request
      const errors = validationResult(req);

      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create User object with escaped and trimmed data
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
        });

        if (!errors.isEmpty()) {
          // There are errors. Render the form again.
          // Send back the json with sanitised values/error messages.
          res.json({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            errors: errors.array(),
          });
          return;
        } else {
          // Data received is valid
          // Save the new user
          await user.save();
          res.json("Success");
        }
      } catch (error) {
        return next(error);
      }
    } else {
      res.json("User not authorized to perform this operation");
    }
  },
];

exports.user_update = [
  // Validate and sanitize fields
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter Valid email address")
    .escape(),
  body("password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s).{8,16}$/)
    .withMessage(
      "Password must be 8 to 16 characters long and it must contain at least one small case letter, one upper case letter, one number, and one special character"
    )
    .escape(),

  // Process request after validation and sanitization
  async (req, res, next) => {
    const errors = validationResult(req);

    // Create user object with escaped/trimmed data and old id
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        _id: req.params.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        // There are errors send the values back
        // in json format with the error message.
        res.json({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          errors: errors.array(),
        });
      }
    } catch (error) {
      return next(error);
    }
  },
];
