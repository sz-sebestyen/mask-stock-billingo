const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Database
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const Users = require('./models/users');

// MongoDb Atlas
const connectionString = "mongodb...";

mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


app.listen(3001, () => {
    console.log('listening on 3001');
});