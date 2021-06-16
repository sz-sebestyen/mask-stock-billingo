const mongoose = require("mongoose");

/* const testUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: Boolean, required: true },
  sex: { type: Boolean, required: true },
}); */

const testUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: Boolean, required: true },
  sex: { type: Boolean, required: true },
});
module.exports = mongoose.model("TestUser", testUserSchema);
