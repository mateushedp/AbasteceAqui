const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  name: String,
  cnpj: String,
});

module.exports = mongoose.model('Station', stationSchema);
