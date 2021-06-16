const express = require('express');
const RegUser = require("../models/regUser");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router({mergeParams: true});

router.post("/login", (req, res, next) => {
    console.log(req.body);
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("User does not exist.");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully authenticated.");
          console.log(req.user);
        });
      }
    })(req, res, next);
});
  
router.post("/register", (req, res) => {
    console.log(req.body);
    RegUser.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User already exists.");
        if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newRegUser = new RegUser({
            username: req.body.username,
            password: hashedPassword,
        });
        await newRegUser.save();
        res.send("User created.");
        console.log("User created.");
        }
    });
});

router.get("/user", (req, res) => {
    res.send(req.user);
});

module.exports = router;