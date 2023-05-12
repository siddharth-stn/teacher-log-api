require("dotenv").config();
const fs = require("fs");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const passport = require("passport");
require("./passport.config");

var privateRouter = require("./routes/private");
let publicRouter = require("./routes/public");

var app = express();

// Set Up mongoose connection
const db_test_URL = process.env.MONGODB_URL;

const mongoose = require("mongoose");
(async function main() {
  await mongoose.connect(db_test_URL);
})()
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

//** Setup admin user
const User = require("./models/user");
const bcrypt = require("bcryptjs");

const startup = async () => {
  const path = "./.seed/userSeed.json";
  try {
    const data = await fs.readFileSync(path, "utf8");
    const userData = JSON.parse(data);
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await User.create(userData);
    console.log("admin created in the database");
    console.log("The user created is: ", user);
    deleteAdminFolder(path);
  } catch (error) {
    console.log("Admin present in database");
    return;
  }
};

const deleteAdminFolder = async (path) => {
  try {
    await fs.unlinkSync(path);
    console.log("file deleted successfully");
  } catch (error) {
    console.log(error);
    return;
  }
};

startup();
//** Admin User Setup Complete */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/public", publicRouter);
app.use(
  "/private",
  passport.authenticate("jwt", { session: false }),
  privateRouter
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
