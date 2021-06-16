const express = require("express");
const mongoose = require("mongoose");
const testHospital = require("./models/testHospital");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const app = express();
// const RegUser = require("./models/regUser");
// const user = require('./models/user');
require("dotenv/config"); //.env-hez

// npm i express body-parser cors mongoose passport passport-local cookie-parser bcryptjs express-session
// npm i nodemon
// npm i dotenv 							//.env-hez

/* app.use(express.urlencoded({ extended: true })); */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // react app port
    credentials: true,
  })
);

// Passport
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.post("/login", (req, res, next) => {
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

app.post("/register", (req, res) => {
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

app.get("/user", (req, res) => {
  res.send(req.user);
});

app.use(
  cors({
    origin: "http://localhost:3000", // react app port
    credentials: true,
  })
);

// const passportLocal = require("passport-local").Strategy;

// npm i express body-parser cors mongoose passport passport-local cookie-parser bcryptjs express-session
// npm i nodemon

// Passport
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
//
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Database
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

// MongoDb Atlas
const connectionString = process.env.DB_CONNECTION;
//  const connectionString =
//   "mongodb+srv://admin:admin@cluster0.wzkbd.mongodb.net/MaskStock?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
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

// const connectionString = "mongodb+srv://admin:admin@cluster0.wzkbd.mongodb.net/MaskStock?retryWrites=true&w=majority";
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

// set datas to default
app.get("/setDefault", async (req, res) => {
  const date = new Date();

  const myDatasDefault = new MyDatas({
    selfID: "selfData",
    name: "placeholder",
    bill: "placeholder",
    country_code: "placeholder",
    post_code: "placeholder",
    city: "placeholder",
    address: "placeholder",
    number_of_masks: 10000,
    current_month: date.getMonth(),
  });
  const response = await myDatasDefault.save();
  res.send(response);
});

/* app.get("/setMask/:maskNumber" ,  async (req, res) => {
  const resp = await maskNumberChange(req.params.maskNumber);
  res.json(resp)
}) */

async function maskNumberChange(changeNumber) {
  console.log(" In maskNumberChange");
  const response = await MyDatas.updateOne(
    { selfID: "selfData" },
    { $inc: { number_of_masks: changeNumber } }
  );
  return response;
}

async function ifMonthChange() {
  let date = new Date();
  let currentMonth = date.getMonth();
  const response = await MyDatas.updateOne(
    { selfID: "selfData" },
    { $set: { current_month: currentMonth } }
  );
  console.log(response);
}

async function checkDate() {
  let date = new Date();
  const readMonth = await MyDatas.find({ selfID: "selfData" });
  if (readMonth[0].current_month === date.getMonth() - 1) {
    console.log("a detect -1 month");
    maskNumberChange(10000);
    ifMonthChange();
  }
}

checkDate();

const hospitalRoutes = require("./routes/hospitalRoute");
app.use("/hospitals", hospitalRoutes);

const userRoutes = require("./routes/userRoute");
app.use("/users", userRoutes);

const TestUser = require("./models/testUser");
const TestHospital = require("./models/testHospital");

// ----USER----

// saját adatbázis,
// --benne a maszkok száma
// maszkok számának módosítása
/* const connectionString =
  "mongodb+srv://admin:admin@cluster0.wzkbd.mongodb.net/MaskStock?retryWrites=true&w=majority"; */
/* mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose
  .connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err)); */

// Routes
const partnersRoutes = require("./controllers/partners");
const authRoutes = require("./controllers/auth");

app.use("/api", partnersRoutes);
app.use(authRoutes);

const productsRoutes = require("./controllers/products");
app.use("/api", productsRoutes);

const bankaccountsRoutes = require("./controllers/bankAccounts");
app.use("/api", bankaccountsRoutes);

const docBlocksRoute = require("./controllers/documentBlocks");
app.use("/api", docBlocksRoute);

app.listen(3001, () => {
  console.log("listening on 3001");
});
