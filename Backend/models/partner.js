const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
	name: { type: String, required: true },						//Partner neve
	address: {
		country_code: { type: String, required: true },	//Ország
		post_code: { type: String, required: true },		//Irányítószám
		city: { type: String, required: true },					//Település
		address: { type: String, required: true }				//Cím 
	},
	emails: [
		{ type: String }																//E-mail
	],
	taxcode: { type: String },												//Adószám
	iban: { type: String },														//IBAN
	swift: { type: String },													//Swift / BIC 
	account_number: { type: String },									//Bankszámlaszám
	phone: { type: String },													//Telefonszám
	general_ledger_number: { type: String },					//Vevő főkönyvi szám
	tax_type: { type: String, required: true },				//Adózási típus
	custom_billing_settings: {
		payment_method: "aruhitel",
		document_form: "electronic",
		due_days: { type: Number, required: true },
		document_currency: { type: String, required: true },
		template_language_code: "de",		//string?
		discount: {
			type: "percent",
			value: { type: Number, required: true }
		}
	},
	group_member_tax_number: { type: String }					//Csop. adószám??
});

module.exports = mongoose.model('Partner', partnerSchema);