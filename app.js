const express = require('express');
//const cors = require('cors');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
//app.use(cors());
app.use(express.json());
app.use(routes);

mongoose
.connect(process.env.DB_CONN)
.then(result => {
    app.listen(3001, () => {
        console.log("Ouvindo na 3001");
      })
})
.catch(error => {
    console.log(error);
});
