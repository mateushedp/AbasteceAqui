const express = require('express');
//const cors = require('cors');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();
//app.use(cors());
app.use(express.json());
app.use(routes);

// mongoose
// .connect(process.env.DB_CONN)
// .then(() => {
//     app.listen(process.env.PORT, () => {
//         console.log("Ouvindo na " + process.env.PORT);
//       })
// })
// .catch(error => {
//     console.log(error);
// });

module.exports = app;
