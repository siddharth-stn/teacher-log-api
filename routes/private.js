var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const logController = require("../controllers/logController");
const commentController = require("../controllers/commentController");

//* USER ROUTES
/* Show users. */
router.get("/users/list", userController.user_list);

/* Create User */
router.post("/user/create", userController.user_create);

/* Update User. */
router.put("/user/update/:user_id", userController.user_update);

/* Delete User. */
router.delete("/user/delete/:user_id", userController.user_delete);

//* LOG ROUTES
/* Show the list of logs for a particular user */
router.get("/log/list/:user_id", logController.log_list);

/* Create Log */
router.post("/log/create/:user_id", logController.log_create);

/* Delete Log */
router.delete("log/delete/:log_id", function (req, res) {
  res.send(`NOT IMPLEMENTED: DELETE LOG, Log Id is: ${req.params.log_id}`);
});

/* Update Log */
router.put("/log/update/:log_id", logController.log_update);

//* COMMENT ROUTES
/* Show all comments for a log */
router.get("/comment/list/:log_id", commentController.comments_list);

/* Create a comment */
router.post("/comment/create/:log_id", function (req, res) {
  res.send(
    `Create a comment for a particular log, log id is: ${req.params.log_id}`
  );
});

/* Update a comment */
router.put("/comment/update/:comment_id", function (req, res) {
  res.send(`Update a comment, comment id is: ${req.params.comment_id}`);
});

/* Delete a comment */
router.delete("/comment/delete/:comment_id", function (req, res) {
  res.send(`Delete a comment, comment id is: ${req.params.comment_id}`);
});

module.exports = router;
