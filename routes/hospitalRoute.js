const express = require("express");
let router = express.Router();

const TestHospital = require("../models/testHospital");


router.get("/ping", (req, res) => {
  res.send("hospitals pong");
});


// kórház felvétele az adatbázisba
// http://localhost:3001/hospitals/addNewHospital
router.post("/addNewHospital", async (req, res) => {

  const doc = new TestHospital({
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
    city: req.body.city,
  });

  const response = await doc.save();
  res.json(response);
});


// Kórházak teljes listájának lekérdezése
// http://localhost:3001/hospitals/allOf
router.get("/allOf" , async (req, res) => {
	const response = await TestHospital.find();
	res.json(response)
	})


// kórház  keresése, adatainak lekérdezése
//http://localhost:3001/hospitals/searchByName/Test
router.get("/searchByName/:search" , async (req, res) => {
  const response = await TestHospital.findOne({name: new RegExp(req.params.search)});
  res.json(response)
  })


	// -----kórház adatainak módosítása
// http://localhost:3001//hospitals/update/search.key.value 
// post : http://localhost:3001//hospitals/update/LechterMed.country.Italy
router.post("update/:searchName.:key.:value" , async (req, res) => {
	console.log("update");
const response = await TestHospital.updateOne({name: [req.params.searchName] }, {$set: {[req.params.key] : req.params.value} })

  res.json(response)
})



module.exports = router;