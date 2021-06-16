const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
const authRoutes = require("./controllers/auth");

app.use("/api", partnersRoutes);
app.use(authRoutes);

app.listen(3001, () => {
  console.log("listening on 3001");
});
