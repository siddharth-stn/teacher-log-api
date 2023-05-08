var express = require("express");
var router = express.Router();

/* Login to website/webapp */
router.post("/login", function (req, res, next) {
  res.send("NOT IMPLEMENTED: LOGIN on POST ");
});

module.exports = router;
