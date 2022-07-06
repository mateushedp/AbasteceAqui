const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  credit: Number,
});

module.exports = mongoose.model('Client', clientSchema);
