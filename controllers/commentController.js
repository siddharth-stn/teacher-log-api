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

// Handle Comment Create on POST
exports.comments_create = [
  // log: { type: Schema.Types.ObjectId, ref: "Log", required: true },
  // commentBody: { type: String, trim: true },
  // isBySelf: {
  //   type: Boolean,
  //   enum: [true, false],
  //   default: true,
  //   required: true,
  // },
  // date: { type: Date, default: Date.now, required: true },

  body("commentbody")
    .trim()
    .isLength({ min: 10 })
    .withMessage("comment must be atleast 10 characters long")
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      log: req.params.log_id,
      commentBody: req.body.commentBody,
      isBySelf: req.user.isAdmin === true ? false : true,
    });

    if (!errors.isEmpty()) {
      // there are errors
      // send back the json with sanitized values
      res.json({
        commentBody: req.body.no_of_periods,
        errors: errors.array(),
      });
      return;
    } else {
      try {
        await comment.save();
        res.json("comment posted successfully");
      } catch (error) {
        return next(error);
      }
    }
  },
];
