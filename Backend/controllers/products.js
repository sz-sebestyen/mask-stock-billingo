const express = require('express');
const fetch = require('node-fetch');
const router = express.Router({ mergeParams: true });
const Products = require('../models/product');

const apiKey = process.env.API_KEY;
// const apiKey = '2fe9f974-cd27-11eb-a32a-06ac9760f844';

const options = {
	headers: {
		'X-API-KEY': apiKey
	}
};

const billingoApi = 'https://api.billingo.hu/v3';

router.get('/products', (req, res) => {
	Products.find()
		.exec()
		.then(doc => res.status(200).json(doc))
		.catch(err => res.status(500).json({ error: err }));
})

router.get('/products/:id', async (req, res) => {
	const response = await fetch(`${billingoApi}/products/${req.params.id}`, { method: 'GET', headers: options.headers });
	const jsonResponse = await response.json();
	res.send(jsonResponse);
});

router.post('/products', async (req, res) => {
	// console.log(req.body);
	const response = await fetch(`${billingoApi}/products`, { method: 'POST', headers: options.headers, body: JSON.stringify(req.body) });
	const jsonResponse = await response.json();
	Products.create(jsonResponse);
	res.send(jsonResponse);
});

module.exports = router;