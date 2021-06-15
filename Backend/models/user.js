const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     address: {
//         country_code: "",
//         post_code: { type: String, required: true },
//         city: { type: String, required: true },
//         address: { type: String, required: true }
//     },
//     emails: [
//         { type: String, required: true }
//     ],
//     taxcode: { type: String, required: true },
//     iban: { type: String, required: true },
//     swift: { type: String, required: true },
//     account_number: { type: String, required: true },
//     phone: { type: String, required: true },
//     general_ledger_number: { type: String },
//     tax_type: { type: String },
//     custom_billing_settings: {
//         payment_method: "aruhitel",
//         document_form: "electronic",
//         due_days: 0,
//         document_currency: "AUD",
//         template_language_code: "de",
//         discount: {
//             type: "percent",
//             value: 0
//         }
//     },
//     group_member_tax_number: { type: String, required: true },
//     id: 0
// });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hospitals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);