const express = require("express");
const fetch = require("node-fetch");
const router = express.Router({ mergeParams: true });
const BankAccounts = require("../models/bankaccount");

const apiKey = process.env.API_KEY;

const options = {
  headers: {
    "X-API-KEY": apiKey,
  },
};

const billingoApi = "https://api.billingo.hu/v3";

router.get("/bankaccounts", (req, res) => {
  BankAccounts.find()
    .exec()
    .then((doc) => res.status(200).json(doc))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/bankaccounts/:id", async (req, res) => {
  const response = await fetch(
    `${billingoApi}/bank-accounts/${req.params.id}`,
    { method: "GET", headers: options.headers }
  );
  const jsonResponse = await response.json();
  res.send(jsonResponse);
});

router.post("/bankaccounts", async (req, res) => {
  const response = await fetch(`${billingoApi}/bank-accounts`, {
    method: "POST",
    headers: options.headers,
    body: JSON.stringify(req.body),
  });
  const jsonResponse = await response.json();
  BankAccounts.create(jsonResponse);
  res.send(jsonResponse);
});

module.exports = router;
