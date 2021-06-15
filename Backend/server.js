const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

// npm i express body-parser cors mongoose passport passport-local cookie-parser bcryptjs express-session
// npm i nodemon

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",  // react app port
    credentials: true
}));

// Passport
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser("secretcode"));

app.post("/login", (req, res) => {
    console.log(req.body);
});

app.post("/register", (req, res) => {
    console.log(req.body);
});

app.get("/user", (req, res) => {

});

// Database
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// MongoDb Atlas
const connectionString = "mongodb+srv://admin:admin@cluster0.wzkbd.mongodb.net/MaskStock?retryWrites=true&w=majority";

mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


app.listen(3001, () => {
    console.log('listening on 3001');
});