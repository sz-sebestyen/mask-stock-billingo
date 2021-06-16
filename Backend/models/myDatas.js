const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
	selfID:					{ type: String, required: true },
	name:           { type: String, required: true },
	bill:           { type: String, required: true },
	country_code:   { type: String, required: true },
	post_code:      { type: String, required: true },
	city:           { type: String, required: true },
	address:        { type: String, required: true },
	number_of_masks: {type: Number, required: true },
	current_month:  {type: Number, required: true }
});


module.exports = mongoose.model('MyData', dataSchema);