require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportConfig = require("./passportConfig");

// models
const maskNumberChange = require("./maskNumberChange");
const MyDatas = require("./models/myDatas");

// Routes
const partnersRoutes = require("./controllers/partners");
const authRoutes = require("./controllers/auth");
const productsRoutes = require("./controllers/products");
const bankaccountsRoutes = require("./controllers/bankAccounts");
const docBlocksRoute = require("./controllers/documentBlocks");
const documentRoute = require("./controllers/documents");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // react app port
    credentials: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// mongoDb
const connectionString = process.env.DB_CONNECTION;

mongoose
  .connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

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

app.get("/maskNumber", async (req, res) => {
  const ask = await MyDatas.find({ selfID: "selfData" });
  res.json(ask[0].number_of_masks);
});

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

app.use("/api", partnersRoutes);
app.use(authRoutes);
app.use("/api", productsRoutes);
app.use("/api", bankaccountsRoutes);
app.use("/api", docBlocksRoute);
app.use("/api", documentRoute);

app.listen(3001, () => {
  console.log("listening on 3001");
});
