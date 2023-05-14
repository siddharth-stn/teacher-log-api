var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

//* USER ROUTES
/* Show users. */
router.get("/users/list", userController.user_list);

router.post("/user/create", function (req, res) {
  res.send("NOT IMPLEMENTED: Create User on POST ");
});

/* Update User. */
router.put("/user/update/:user_id", function (req, res) {
  res.send(`NOT IMPLEMENTED: Update User on PUT, Id is: ${req.params.user_id}`);
});

/* Delete User. */
router.delete("/user/delete/:user_id", function (req, res) {
  res.send(
    `NOT IMPLEMENTED: Delete User on DELETE, Id is: ${req.params.user_id}`
  );
});

//* LOG ROUTES
/* Show the list of logs for a particular user */
router.get("/log/list/:user_id", function (req, res) {
  res.send(
    `NOT IMPLEMENTED: Show list of logs by date of entry, USER Id is: ${req.params.user_id}`
  );
});

/* Create Log */
router.post("/log/create/:user_id", function (req, res) {
  res.send(
    `NOT IMPLEMENTED: CREATE LOG on POST, USER Id is: ${req.params.user_id}`
  );
});

/* Delete Log */
router.delete("log/delete/:log_id", function (req, res) {
  res.send(`NOT IMPLEMENTED: DELETE LOG, Log Id is: ${req.params.log_id}`);
});

/* Update Log */
router.put("/log/update/:log_id", function (req, res) {
  res.send(`NOT IMPLEMENTED: UPDATE LOG, Log Id is: ${req.params.log_id}`);
});

//* COMMENT ROUTES
/* Show all comments for a log */
router.get("/comment/list/:log_id", function (req, res) {
  res.send(
    `Show all comments for a particular log, log id is: ${req.params.log_id}`
  );
});

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
