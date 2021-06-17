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

router.post("/documents", async (req, res) => {
  const invoice = {
    partner_id: 1736092350,
    block_id: 108926,
    bank_account_id: 94702,
    type: "advance",
    fulfillment_date: "2020-05-07",
    due_date: "2020-05-07",
    payment_method: "bankcard",
    language: "hu",
    currency: "HUF",
    electronic: true,
    paid: false,
    items: [
      {
        product_id: 7556148,
        quantity: 1,
      },
    ],
    comment: "here comes the invoice comment",
  };

  const response = await fetch(`${billingoApi}/documents`, {
    method: "POST",
    headers: options.headers,
    body: JSON.stringify(invoice),
  });
  const jsonResponse = await response.json();

  res.send(jsonResponse);
  console.log("res: ", jsonResponse);
});

module.exports = router;
