const mongoose = require("mongoose");

const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now, required: true },
  no_of_periods: { type: Number, required: true },
  data: { type: Object, required: true },
  isLocked: {
    type: Boolean,
    enum: [true, false],
    default: true,
    required: true,
  },
  isIncomplete: {
    type: Boolean,
    enum: [true, false],
    default: false,
    required: true,
  },
});

LogSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).setLocale("fr").toLocateString();
});

module.exports = mongoose.model("Log", LogSchema);
