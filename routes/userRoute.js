const express = require("express");
let router = express.Router();

const TestUser = require("../models/testUser");

router.get("/ping", (req, res) => {
  res.send("users pong");
});

// User felvétele az adatbázisba
// post http://localhost:3001/users/addNewUser
router.post("/addNewUser", async (req, res) => {
  
  const doc = new TestUser({
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
    sex: req.body.sex,
  });
  
  const response = await doc.save();
  res.json(response);
});


// Userek teljes listájának lekérdezése
// post http://localhost:3001/users/allOf
router.get("/allOf" , async (req, res) => {
  const response = await TestUser.find();
  res.json(response)
  })


// user keresése, adatainak lekérdezése
//  gethttp://localhost:3001/users/searchByName/Ödön
router.get("/searchByName/:search" , async (req, res) => {
  const response = await TestUser.findOne({name: new RegExp(req.params.search)});
  res.json(response)
  })


	// user adatainak módosítása
// post http://localhost:3001//users/update/Zsíros B. Ödön.email.kolesz@terin.hu
router.post("/update/:searchName.:key.:value" , async (req, res) => {
  const response = await TestUser.updateOne({name: [req.params.searchName] }, {$set: {[req.params.key] : req.params.value} })

  res.json(response)
})

module.exports = router;