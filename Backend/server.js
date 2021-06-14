const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// MongoDb Atlas
const connectionString = "mongodb+srv://admin:admin@cluster0.wzkbd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


app.listen(3001, () => {
    console.log('listening on 3001');
});