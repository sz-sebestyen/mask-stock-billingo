const express = require("express");
const mongoose = require("mongoose");
const testHospital = require("./models/testHospital");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
require("dotenv/config"); //.env-hez

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

app.get("/ping", (req, res) => {
  res.send("pong");
});

// self-datas
const MyDatas = require("./models/myDatas");

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
