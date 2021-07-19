const mongoose = require("mongoose");

const bankaccountSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  account_number: { type: String, required: true },
  account_number_iban: { type: String },
  swift: { type: String },
  currency: { type: String, required: true },
  need_qr: { type: Boolean, default: false },
});

module.exports = mongoose.model("Bankaccount", bankaccountSchema);
