const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: { type: String, required: true, trim: true },
  isTeacher: {
    type: Boolean,
    enum: [true, false],
    default: true,
    required: true,
  },
});

if (UserSchema.path("isTeacher").options.type === Boolean) {
  UserSchema.add({
    isAdmin: {
      type: Boolean,
      required: true,
      default: () => !this.isTeacher,
    },
  });
}

module.exports = mongoose.model("User", UserSchema);
