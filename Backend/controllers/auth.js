const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router({ mergeParams: true });

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
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exists.");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newRegUser = new User({
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
  if (req.isUnauthenticated()) {
    res.status(401);
    res.json({ message: "Unauthorized" });
  } else {
    res.send({ message: "User is authenticated", user: req.user });
  }
});

router.get("/user/logout", (req, res) => {
  if (req.isUnauthenticated()) {
    res.status(401);
    res.json({ message: "Unauthorized" });
  } else {
    req.logout();
    req.session.destroy();
    res.json({ message: "Logout success" });
  }
});

module.exports = router;
