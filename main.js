const express = require('express');
const cors = require('cors');

const app = express();

const connection = require('./connection');

connection.connect(app);

const searchRoute = require('./routes/search');

app.use(cors());
app.use(express.json());

app.use('/search', searchRoute);
