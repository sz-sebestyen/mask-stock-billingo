const express = require("express");
const mongoose = require("mongoose");

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
const TestUser = require("./models/testUser");

//----- Routingot majd később kiszervezem

app.get("/ping", (req, res) => {
  res.send("pong");
});

// kórház felvétele az adatbázisba
app.post("/hospitals/addNewHospital", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// Kórházak teljes listájának lekérdezése

// kórház  keresése, adatainak lekérdezése

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
