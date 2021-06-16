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
  "mongodb+srv://admin:admin@cluster0.wzkbd.mongodb.net/MaskStock?retryWrites=true&w=majority";

const tempConnectionSting =
  "mongodb+srv://TryUser:tryPass@cluster0.bilbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Modells import
//const User = require("./models/user");
//const Hospital = require("./models/hospital");
//const Product = require("./models/product");


// Rendelés POST
// - saját bankszámla
// - kórház azonosíta
// - Kórház többi adataánek bekérése a databnase-ről
// - van-e annyi maszk, mint amennyit kér


// függvény => user ID-t kap, visszaadja a kórházakat, amik hozzá tartoznak. 
// user bejelentkezik GET
// Visszakapja az a saját adatait és a kórházat

// saját adatbázis, számlázási adatainkkal, és maszkok számával 
// minden hónap elején 10.000 maszkot hozzáadni 





//----- Routingot majd később kiszervezem


const hospitalRoutes = require("./routes/hospitalRoute")
app.use("/hospitals" , hospitalRoutes)

const userRoutes = require("./routes/userRoute")
app.use("/users" , userRoutes)



const TestUser = require("./models/testUser");
const TestHospital = require("./models/testHospital");


app.get("/ping", (req, res) => {
  res.send("pong");
});

// ----USER----


// user adatainak módosítása
// post http://localhost:3001//users/update/Zsíros B. Ödön.email.kolesz@terin.hu
app.post("/usersweq/update/:searchName.:key.:value" , async (req, res) => {
  const response = await TestUser.updateOne({name: [req.params.searchName] }, {$set: {[req.params.key] : req.params.value} })

  res.json(response)
})


// saját adatbázis, 
// --benne a maszkok száma
// maszkok számának módosítása


// számla adatbázis létrehozása
// számla adatbázis lekérdezése

app.listen(3001, () => {
  console.log("listening on 3001");
});
