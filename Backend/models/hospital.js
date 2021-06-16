const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name:           { type: String },
    country_code:   { type: String },
    post_code:      { type: String },
    city:           { type: String },
    address:        { type: String },

});

const discountSchema = new mongoose.Schema({
    type:   { type: String },
    value:  { type: Number },
});

const billingSchema = new mongoose.Schema({
    name:                   { type: String },
    country_code:           { type: String },
    post_code:              { type: String },
    city:                   { type: String },
    address:                { type: String },
    payment_method:         { type: String },
    document_form:          { type: String },
    due_days:               { type: Number },
    document_currency:      { type: String },
    template_language_code: { type: String },
    discount:               { type: discountSchema },
});

const hospitalSchema = new mongoose.Schema({
    id:                     { type: Number, required: true, unique: true },
    name:                   { type: String, required: true, unique: true },
    address:                { type: addressSchema },
    emails:                 { type: Array, required: true, unique: true },
    taxcode:                { type: String, required: true },
    iban:                   { type: String, required: true },
    swift:                  { type: String, required: true },
    account_number:         { type: String, required: true },
    phone:                  { type: String, required: true },
    general_ledger_number:  { type: String, required: true },
    tax_type:               { type: String },
    custom_billing_settings:{ type: billingSchema },
    group_member_tax_number:{ type: String },

    // users: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // ],
});

module.exports = mongoose.model('Hospital', hospitalSchema);
