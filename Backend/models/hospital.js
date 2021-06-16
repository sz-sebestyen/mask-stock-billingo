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
    id:                     { type: Number, unique: true },
    name:                   { type: String },
    address:                { type: addressSchema },
    emails:                 { type: Array },
    taxcode:                { type: String },
    iban:                   { type: String },
    swift:                  { type: String },
    account_number:         { type: String },
    phone:                  { type: String },
    general_ledger_number:  { type: String },
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
