const Log = require("../models/log");
const { body, validationResult } = require("express-validator");

// Show the list of Logs by a particular teacher on GET
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

// Handle Log create by non - admin employee on POST
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

    const log = new Log({
      user: req.user._id,
      no_of_periods: req.body.no_of_periods,
      data: req.body.data,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again.
      // Send back the json with sanitised values/error messages.

      res.json({
        no_of_periods: req.body.no_of_periods,
        data: req.body.data,
        errors: errors.array(),
      });
      return;
    } else {
      try {
        await log.save();
        res.json("log Created successfully");
      } catch (error) {
        return next(error);
      }
    }
  },
];

// Handle log update by non - admin employee on PUT
exports.log_update = [
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

    const log = new Log({
      user: req.user._id,
      no_of_periods: req.body.no_of_periods,
      data: req.body.data,
      _id: req.params.log_id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again.
      // Send back the json with sanitised values/error messages.

      res.json({
        no_of_periods: req.body.no_of_periods,
        data: req.body.data,
        errors: errors.array(),
      });
      return;
    } else {
      try {
        await Log.findByIdAndUpdate(req.params.log_id, log);
        res.json("log Created successfully");
      } catch (error) {
        return next(error);
      }
    }
  },
];
