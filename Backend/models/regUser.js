const mongoose = require("mongoose");

const regUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("RegUser", regUserSchema);
