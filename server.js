const app = require('./app');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB_CONN)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Ouvindo na ' + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
