const mongoose = require('mongoose');

const docBlockSchema = new mongoose.Schema({
	// "id": { type: Number },
	// "name": { type: String },
	// "prefix": { type: String },
	// "custom_field1": { type: String },
	// "custom_field2": { type: String }

	"data": [
		{
			"id": { type: Number },
			"name": { type: String },
			"prefix": { type: String },
			"custom_field1": { type: String },
			"custom_field2": { type: String }
		}
	],
	"total": { type: Number },
	"per_page": { type: Number },
	"current_page": { type: Number },
	"last_page": { type: Number },
	"prev_page_url": { type: String },
	"next_page_url": { type: String }
});

module.exports = mongoose.model('DocumentBlock', docBlockSchema);