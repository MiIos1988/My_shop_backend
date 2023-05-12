const Mongoose = require("mongoose");

const userSChema = new Mongoose.Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String },
  // confirmPassword: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  city: { type: String },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
});

const UserModel = Mongoose.model("users", userSChema);
module.exports = UserModel;
