const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const RegUser = require("./models/regUser");

// npm i express body-parser cors mongoose passport passport-local cookie-parser bcryptjs express-session
// npm i nodemon

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

// Database
const connectionString =
  "mongodb+srv://admin:admin@cluster0.wzkbd.mongodb.net/MaskStock?retryWrites=true&w=majority";
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose
  .connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Routes
const partnersRoutes = require("./controllers/partners");
app.use("/api", partnersRoutes);

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

app.listen(3001, () => {
  console.log("listening on 3001");
});
