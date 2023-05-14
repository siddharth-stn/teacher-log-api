require("dotenv");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

/* Login to website/webapp */
router.post("/login", function (req, res) {
  // the default - session is set to false when using JWT
  passport.authenticate(
    "local",
    { session: false },
    (err, user, message) /* this is an iife callback  */ => {
      if (err || !user) {
        return res.status(400).json({
          err: err,
          info: message,
          user: user,
        });
      }
      // this login method is attached to the req object by the passport library
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        // generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
        return res.json({ token });
      });
    }
  )(req, res);
  /* Here the iife is making a closure and the value of req, and res 
  is passed in as the closure value which may be used when this callback function
  is called by the passport.authenticate function
  passport.authenticate() returns a function which is immideately called due to iife  */
});

module.exports = router;
