const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    phone:      { type: String, required: true },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
});

module.exports = mongoose.model('Hospital', hospitalSchema);