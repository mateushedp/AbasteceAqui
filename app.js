const express = require('express');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(routes);

module.exports = app;
