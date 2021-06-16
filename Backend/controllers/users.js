const express = require('express');
const router = express.Router({ mergeParams: true });
const Users = require('../models/user');

router.get('/user', async (req, res) => {
    if (!req.user) {
        return;
    }
    const foundUser = await Users.findOne({username: req.user.username}).populate('hospitals').exec();

    res.send(foundUser);
});

module.exports = router;