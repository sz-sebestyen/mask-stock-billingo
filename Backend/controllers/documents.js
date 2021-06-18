const express = require("express");
const fetch = require("node-fetch");
const router = express.Router({ mergeParams: true });
const Partners = require("../models/hospital");
const Users = require("../models/user");

const apiKey = process.env.API_KEY;

const options = {
  headers: {
    "X-API-KEY": apiKey,
  },
};

const billingoApi = "https://api.billingo.hu/v3";

const timestamp = () => {
  const today = new Date();
  return [
    today.getFullYear(),
    today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1,
    today.getDate() < 10 ? "0" + today.getDate() : today.getDate()
  ].join("-");
};

//TODO:
router.post("/documents", async (req, res) => {
  console.log("TAX_TYPE: ", req.body.partner_tax_type);
  const invoice = {
    partner_id: req.body.partner_id,
    block_id: req.body.partner_tax_type === "huf" ? "108926" : "109136",
    bank_account_id: req.body.partner_tax_type === "huf" ? "94703" : "94702",
    type: "invoice",
    fulfillment_date: timestamp(),
    due_date: timestamp(),
    payment_method: "bankcard",
    language: req.body.partner_tax_type === "huf" ? "hu" : "en",
    currency: req.body.partner_tax_type === "huf" ? "HUF" : "EUR",
    conversion_rate: 1,
    electronic: true,
    paid: true,
    items: [
      {
        product_id: req.body.partner_tax_type === "huf" ? "7556148" : "7555674",
        quantity: req.body.quantity,
      },
    ],
    // partner_id: 1736092350, //FE
    // block_id: 108926,       //FE hospital tax type
    // bank_account_id: 94702, //FE hospital tax type
    // type: "invoice",
    // fulfillment_date: "2020-05-07", //timestamp
    // due_date: "2020-05-07",         //timestamp
    // payment_method: "bankcard",
    // language: "hu",         //FE hospital tax type
    // currency: "HUF",        //FE hospital tax type
    // electronic: true,
    // paid: true,
    // items: [
    //   {
    //     p{ type: Number, required: true }roduct_id: 7556148,//FE hospital tax type
    //     quantity: 1,        //FE
    //   },
    // ],
    comment: "",
  };

  const response = await fetch(`${billingoApi}/documents`, {
    method: "POST",
    headers: options.headers,
    body: JSON.stringify(invoice),
  });
  const jsonResponse = await response.json();

  const https = require('https');

  const downloadOptions = {
    hostname: `api.billingo.hu`,
    path: `/v3/documents/${jsonResponse.id}/download`,
    headers: {
      'X-API-KEY': "2fe9f974-cd27-11eb-a32a-06ac9760f844"
    }
  };

  const fs = require('fs');
  const file = fs.createWriteStream(`./download/${jsonResponse.invoice_number}.pdf`);

  setTimeout(() => {
    console.log("download started");
    https.get(downloadOptions, (res) => {
      res.pipe(file)
    });
  }, 10 * 1000);

  res.send(jsonResponse);
  console.log("res: ", jsonResponse);
});

router.get('/documents/download/:id', function (req, res) {
  const file = `${__dirname}/../download/${req.params.id}.pdf`;
  res.download(file);
});


module.exports = router;
