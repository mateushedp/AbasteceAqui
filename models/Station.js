const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  name: String,
  cnpj: String,
  discount: Number,
});

module.exports = mongoose.model('Station', stationSchema);
