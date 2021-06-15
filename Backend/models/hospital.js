const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name:           { type: String, required: true },
    country_code:   { type: String, required: true },
    post_code:      { type: String, required: true },
    city:           { type: String, required: true },
    address:        { type: String, required: true },

});

const discountSchema = new mongoose.Schema({
    type:   { type: String, required: true },
    value:  { type: Number, required: true },
});

const billingSchema = new mongoose.Schema({
    name:                   { type: String, required: true },
    country_code:           { type: String, required: true },
    post_code:              { type: String, required: true },
    city:                   { type: String, required: true },
    address:                { type: String, required: true },
    payment_method:         { type: String, required: true },
    document_form:          { type: String, required: true },
    due_days:               { type: Number, required: true },
    document_currency:      { type: String, required: true },
    template_language_code: { type: String, required: true },
    discount:               { type: discountSchema, required: true },
});

const hospitalSchema = new mongoose.Schema({
    name:                   { type: String, required: true },
    address:                { type: addressSchema, required: true },
    emails:                 { type: Array, required: true, unique: true },
    taxcode:                { type: String, required: true },
    iban:                   { type: String, required: true },
    swift:                  { type: String, required: true },
    account_number:         { type: String, required: true },
    phone:                  { type: String, required: true },
    general_ledger_number:  { type: String, required: true },
    tax_type:               { type: String, required: true },
    custom_billing_settings:{ type: billingSchema, required: true },

    // users: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // ],
});

module.exports = mongoose.model('Hospital', hospitalSchema);
