const { DateTime } = require("luxon");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  log: { type: Schema.Types.ObjectId, ref: "Log", required: true },
  commentBody: { type: String, trim: true },
  isBySelf: {
    type: Boolean,
    enum: [true, false],
    default: true,
    required: true,
  },
  date: { type: Date, default: Date.now, required: true },
});

if (CommentSchema.path("isBySelf").options.type === Boolean) {
  CommentSchema.add({
    isByAdmin: {
      type: Boolean,
      required: true,
      default: () => !this.isBySelf,
    },
  });
}

CommentSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).setLocale("fr").toLocateString();
});

module.exports = mongoose.model("Log", CommentSchema);
