const Log = require("../models/log");
const { body, validationResult } = require("express-validator");

// Show the list of Logs by a particuar teacher on GET
exports.log_list = async (req, res, next) => {
  if (req.user.isAdmin === true) {
    try {
      const logs = await Log.find({ user: req.params.user_id });
      if (logs.length === 0) {
        res.json("No logs by this employee");
      } else {
        res.send(logs);
      }
    } catch (error) {
      return next(error);
    }
  } else {
    // if the current user is not an admin
    try {
      const logs = await Log.find({ user: req.user._id });
      if (logs.length === 0) {
        res.json("No logs in the database");
      } else {
        res.send(logs);
      }
    } catch (error) {
      return next(error);
    }
  }
};

// Create new Log by non - admin employee on POST
exports.log_create = [
  // validate and sanitize the data
  body("no_of_periods")
    .trim()
    .isNumeric()
    .withMessage("No. of periods should be a number")
    .escape(),
  body("data")
    .trim()
    .isObject()
    .withMessage("Entered data is not an object type"),
  async (req, res, next) => {
    const errors = validationResult(req);
  },
];
