const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router({ mergeParams: true });

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("User does not exist.");
    else {
      req.logIn(user, async (error) => {
        if (error) throw error;
        const foundUser = await User.findOne({ username: req.user.username })
          .populate("hospitals")
          .exec();
        res.json({ user: foundUser });
        console.log("auth user", req.user);
      });
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exists.");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newRegUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.username,
      });
      await newRegUser.save();
      res.send("User created.");
      console.log("User created.");
    }
  });
});

router.get("/user", async (req, res) => {
  if (req.isUnauthenticated()) {
    res.status(401);
    res.json({ message: "Unauthorized" });
  } else {
    const foundUser = await User.findOne({ username: req.user.username })
      .populate("hospitals")
      .exec();
    res.json({ message: "User is authenticated", user: foundUser });
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
