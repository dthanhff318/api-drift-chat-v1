const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    maxlength: 40,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    maxlength: 40,
    unique: true,
  },
  uid: {
    type: String,
    default: null,
  },
  photoUrl: {
    type: String,
    default: null,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

// Tell Mongoose to include virtual properties when converting documents to JSON
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
