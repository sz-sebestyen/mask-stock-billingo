const express = require("express");
const fetch = require("node-fetch");
const router = express.Router({ mergeParams: true });
const Order = require("../models/orders.js");
const maskNumberChange = require("../maskNumberChange");
const MyDatas = require("../models/myDatas");

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
    today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1,
    today.getDate() < 10 ? "0" + today.getDate() : today.getDate(),
  ].join("-");
};

// check data before orders
async function dataCollector(numberOfOrder) {
  const ask = await MyDatas.find({ selfID: "selfData" });

  if (ask[0].number_of_masks >= numberOfOrder) {
    const newStock = await maskNumberChange(0 - numberOfOrder);
    console.log("newStock: ", newStock);

    return true;
  } else {
    return null;
  }
}

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

    comment: "",
  };

  const response = await fetch(`${billingoApi}/documents`, {
    method: "POST",
    headers: options.headers,
    body: JSON.stringify(invoice),
  });
  const jsonResponse = await response.json();

  dataCollector(req.body.quantity);

  const https = require("https");

  const downloadOptions = {
    hostname: `api.billingo.hu`,
    path: `/v3/documents/${jsonResponse.id}/download`,
    headers: {
      "X-API-KEY": apiKey,
    },
  };

  const fs = require("fs");
  const file = fs.createWriteStream(
    `./download/${jsonResponse.invoice_number}.pdf`
  );

  setTimeout(() => {
    console.log("download started");
    https.get(downloadOptions, (httpsRes) => {
      httpsRes.pipe(file);
    });
  }, 3 * 1000);

  const orderCont = new Order(jsonResponse);
  const orderSaveResponse = orderCont.save();
  console.log(orderSaveResponse);

  res.send(jsonResponse);
  console.log("res: ", jsonResponse);
});

router.get("/documents/download/:id", function (req, res) {
  const file = `${__dirname}/../download/${req.params.id}.pdf`;
  res.download(file);
});

module.exports = router;
