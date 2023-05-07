const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  no_of_periods: { type: Number, required: true },
  data: { type: Object, required: true },
});

module.exports = mongoose.model("LogModel", LogSchema);
