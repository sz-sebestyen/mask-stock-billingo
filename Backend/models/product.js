const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	comment: { type: String },
	currency: "AUD",
	vat: "0%",
	net_unit_price: 0,
	unit: { type: String, required: true },
	general_ledger_number: { type: String },
	general_ledger_taxcode: { type: String },
	entitlement: "AAM"
});

module.exports = mongoose.model('Product', productSchema);