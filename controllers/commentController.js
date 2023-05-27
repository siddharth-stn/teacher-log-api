const Comment = require("../models/comment");

const { body, validationResult } = require("express-validator");

// Show list of comments for a particular log on GET
exports.comments_list = async (req, res, next) => {
  try {
    const comments = await Comment.find({ log: req.params.log_id });
    if (comments.length === 0) {
      res.json("No comments for this log");
    } else {
      res.send(comments);
    }
  } catch (error) {
    return next(error);
  }
};
