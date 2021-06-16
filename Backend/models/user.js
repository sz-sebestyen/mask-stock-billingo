const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  hospitals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital'
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
