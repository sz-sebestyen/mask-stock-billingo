const express = require("express");
const mongoose = require("mongoose");
const testHospital = require("./models/testHospital");

const app = express();

/* app.use(express.urlencoded({ extended: true })); */
app.use(express.json());

// Database
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

// MongoDb Atlas
const connectionString =
  "mongodb+srv://admin:admin@cluster0.wzkbd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const tempConnectionSting =
  "mongodb+srv://TryUser:tryPass@cluster0.bilbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(tempConnectionSting, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Modells import
//const User = require("./models/user");
//const Hospital = require("./models/hospital");
//const Product = require("./models/product");
// const TestUser = require("./models/testUser");

const TestHospital = require("./models/testHospital");

console.log(testHospital);
//----- Routingot majd később kiszervezem

app.get("/ping", (req, res) => {
  res.send("pong");
});

// kórház felvétele az adatbázisba
app.post("/hospitals/addNewHospital", async (req, res) => {

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
  app.get("/hospitals/allOf" , async (req, res) => {
    const response = await TestHospital.find();
    res.json(response)
    })

// kórház  keresése, adatainak lekérdezése
app.get("/hospitals/searchByName/:search" , async (req, res) => {
  const response = await TestHospital.findOne({name: new RegExp(req.params.search)});
  res.json(response)
  })

// kórház adatainak módosítása

// User felvétele az adatbázisba

// Userek teljes listájának lekérdezése

// user keresése, adatainak lekérdezése

// user adatainak módosítása

// saját adatbázis, benne a maszkok száma

// maszkok számának módosítása

// számla adatbázis létrehozása

// számla adatbázis lekérdezése

app.listen(3001, () => {
  console.log("listening on 3001");
});
