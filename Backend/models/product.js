const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	id: { type: String, required: true }, //kell??
	name: { type: String, required: true },
	comment: { type: String },
	currency: { type: String, required: true },
	vat: { type: String },
	net_unit_price: { type: Number },
	unit: { type: String, required: true },
	general_ledger_number: { type: String },
	general_ledger_taxcode: { type: String },
	entitlement: { type: String }
});

module.exports = mongoose.model('Product', productSchema);