const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

	partner_id: { type: String, required: false },
	block_id: { type: Number, required: true },
	bank_account_id:{ type: Number, required: false },
	type: { type: String, required: true },
	fulfillment_date: { type: String, required: true },
	due_date:{ type: String, required: true },
	payment_method: { type: String, required: true },
	language: { type: String, required: true },
	currency: { type: String, required: true },
	conversion_rate: { type: Number, required: true },
	electronic: { type: Boolean, required: true },
	paid:{ type: Boolean, required: false },
	items: [
		{
			product_id:{ type: String, required: true },
			quantity:{ type: String, required: true },
		},
	], 
	comment: {type: String, required: false }
});

module.exports = mongoose.model('Order', orderSchema);