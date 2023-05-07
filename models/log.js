const mongoose = require("mongoose");

const { DateTime } = require("luxon");
const { cachedDataVersionTag } = require("v8");

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  no_of_periods: { type: Number, required: true },
  data: { type: Object, required: true },
});

LogSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).setLocale("fr").toLocateString();
});

module.exports = mongoose.model("LogModel", LogSchema);
