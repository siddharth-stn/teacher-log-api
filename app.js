var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var privateRouter = require("./routes/private");
let publicRouter = require("./routes/public");

var app = express();

// Set Up mongoose connection
const db_test_URL =
  "mongodb+srv://siddharth:hanumanji@express-mongo.dlhwrs5.mongodb.net/teacher-log-api?retryWrites=true&w=majority";
const mongoose = require("mongoose");
(async function main() {
  await mongoose.connect(db_test_URL);
})()
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/private", privateRouter);
app.use("/public", publicRouter);

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
