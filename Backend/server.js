const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database
const connectionString = "mongodb+srv://cluster0.wzkbd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Routes
const partnersRoutes = require('./controllers/partners');
app.use('/api', partnersRoutes);

app.listen(3001, () => {
    console.log('listening on 3001');
});