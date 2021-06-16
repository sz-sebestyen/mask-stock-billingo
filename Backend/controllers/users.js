const express = require('express');
const router = express.Router({ mergeParams: true });
const Users = require('../models/user');

router.get('/user', async (req, res) => {
    console.log('user endpoint, req.user: ', req.user)
    if (!req.user) {
        return;
    }
    const foundUser = await Users.findOne({username: req.user.username});
    console.log(foundUser);
    res.send(foundUser);
});

module.exports = router;