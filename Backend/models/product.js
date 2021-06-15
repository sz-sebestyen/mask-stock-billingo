const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	comment: { type: String },
	currency: { type: String, required: true },
	vat: "0%", 						//string?
	net_unit_price: 0, 		//number?
	unit: { type: String, required: true },
	general_ledger_number: { type: String },
	general_ledger_taxcode: { type: String },
	entitlement: "AAM"		//string?
});

module.exports = mongoose.model('Product', productSchema);