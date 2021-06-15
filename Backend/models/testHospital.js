const mongoose = require("mongoose");


const testHospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true }
});

module.exports = mongoose.model("TestHospital", testHospitalSchema);
