const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendantSchema = new Schema({
  name: String,
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
});

module.exports = mongoose.model('Attendant', attendantSchema);
