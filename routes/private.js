var express = require("express");
var router = express.Router();

/* Show users. */
router.get("/users/list", function (req, res, next) {
  res.send("NOT IMPLEMENTED: SHOW USERS on GET");
});

router.post("/user/create", function (req, res) {
  res.send("NOT IMPLEMENTED: Create User on POST ");
});

/* Update User. */
router.put("/user/update/:id", function (req, res, next) {
  res.send("NOT IMPLEMENTED: Update User on PUT ");
});

/* Delete User. */
router.delete("/user/delete/:id", function (req, res, next) {
  res.send("NOT IMPLEMENTED: Delete User on DELETE");
});

module.exports = router;
