const express = require("express");
const fetch = require("node-fetch");
const router = express.Router({ mergeParams: true });

const apiKey = process.env.API_KEY;

const options = {
  headers: {
    "X-API-KEY": apiKey,
  },
};

const billingoApi = "https://api.billingo.hu/v3";

router.get("/documentblocks", async (req, res) => {
  const response = await fetch(`${billingoApi}/document-blocks`, {
    method: "GET",
    headers: options.headers,
  });
  const jsonResponse = await response.json();
  res.send(jsonResponse);
});

module.exports = router;
