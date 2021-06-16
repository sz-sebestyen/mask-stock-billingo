const express = require('express');
const fetch = require('node-fetch');
const router = express.Router({ mergeParams: true });
const Partners = require('../models/hospital');
const Users = require('../models/user');

const apiKey = process.env.API_KEY;
// const apiKey = '2fe9f974-cd27-11eb-a32a-06ac9760f844';

const options = {
    headers: {
        'X-API-KEY': apiKey
    }
};

const billingoApi = 'https://api.billingo.hu/v3';

router.get('/partners', async (req, res) => {
    const response = await fetch(`${billingoApi}/partners`, { method: 'GET', headers: options.headers});
    const jsonResponse = await response.json();
    res.send(jsonResponse);
});

router.get('/partners/:id', async (req, res) => {
    const response = await fetch(`${billingoApi}/partners/${req.params.id}`, { method: 'GET', headers: options.headers });
    const jsonResponse = await response.json();
    res.send(jsonResponse);
});

router.post('/partners', async (req, res) => {
    const response = await fetch(`${billingoApi}/partners`, { method: 'POST', headers: options.headers, body: JSON.stringify(req.body) });
    const jsonResponse = await response.json();

    const foundUser = await Users.findOne({username: req.user.username});

    const partner = await Partners.create(jsonResponse);
    partner.save();

    foundUser.hospitals.push(partner);
    foundUser.save();

    res.send(jsonResponse);
});

router.delete('/partners/:id', async (req, res) => {
    const response = await fetch(`${billingoApi}/partners/${req.params.id}`, { method: 'DELETE', headers: options.headers });
    res.send(response);
});

module.exports = router;