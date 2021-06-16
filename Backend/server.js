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

app.get("/ping", (req, res) => {
  res.send("pong");
});



// self-datas
const MyDatas = require("./models/myDatas");

// set datas to default
app.get("/setDefault", async (req, res) => {
  const date = new Date;

  const myDatasDefault =  new MyDatas ({
  selfID:         "selfData",
  name:           "placeholder",
	bill:           "placeholder",
	country_code:   "placeholder",
	post_code:      "placeholder",
	city:           "placeholder",
	address:        "placeholder",
	number_of_masks: 10000,
  current_month : date.getMonth()
});
const response = await myDatasDefault.save();
  res.send(response);
});


/* app.get("/setMask/:maskNumber" ,  async (req, res) => {
  const resp = await maskNumberChange(req.params.maskNumber);
  res.json(resp)
}) */

async function maskNumberChange (changeNumber) {
 console.log(" In maskNumberChange")
const response =  await MyDatas.updateOne({"selfID": "selfData"}, {$inc: {'number_of_masks' :changeNumber}}); 
 return(response)
};

async function ifMonthChange() {
  let date = new Date;
  let currentMonth = date.getMonth()
  const response =  await MyDatas.updateOne({"selfID": "selfData"}, {$set: {'current_month' : currentMonth}}); 
   console.log(response) 
}

async function checkDate() {
   let date = new Date; 
  const readMonth = await MyDatas.find({selfID :"selfData" }); 
  if (readMonth[0].current_month === date.getMonth() -1 ) {
      console.log("a detect -1 month");
      maskNumberChange(10000);
      ifMonthChange();
  }
};

checkDate();

const hospitalRoutes = require("./routes/hospitalRoute")
app.use("/hospitals" , hospitalRoutes)

const userRoutes = require("./routes/userRoute")
app.use("/users" , userRoutes)

const TestUser = require("./models/testUser");
const TestHospital = require("./models/testHospital");



// ----USER----

// saját adatbázis, 
// --benne a maszkok száma
// maszkok számának módosítása


app.listen(3001, () => {
  console.log("listening on 3001");
});
