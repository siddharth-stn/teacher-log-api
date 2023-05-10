var express = require("express");
var router = express.Router();

//* USER ROUTES
/* Show users. */
router.get("/users/list", function (req, res, next) {
  res.send("NOT IMPLEMENTED: SHOW USERS on GET");
});

router.post("/user/create", function (req, res) {
  res.send("NOT IMPLEMENTED: Create User on POST ");
});

/* Update User. */
router.put("/user/update/:id", function (req, res, next) {
  res.send(`NOT IMPLEMENTED: Update User on PUT, Id is: ${req.params.id}`);
});

/* Delete User. */
router.delete("/user/delete/:id", function (req, res, next) {
  res.send(`NOT IMPLEMENTED: Delete User on DELETE, Id is: ${req.params.id}`);
});

//* LOG ROUTES

/* Show the list of logs for a particular user */
router.post("/log/list/:user_id", function (req, res) {
  res.send(
    `NOT IMPLEMENTED: Show list of logs by date of entry, USER Id is: ${req.params.id}`
  );
});

/* Create Log */
router.post("/log/create/:user_id", function (req, res) {
  res.send(`NOT IMPLEMENTED: CREATE LOG on POST, USER Id is: ${req.params.id}`);
});

module.exports = router;
