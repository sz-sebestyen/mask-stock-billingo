const mongoose = require("mongoose");

const testUserSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: Boolean, required: true },
  name: { type: Boolean, required: true },
};

module.exports = mongoose.model("User", testUserSchema);