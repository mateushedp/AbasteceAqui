const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  value: Number,
  attendant: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendant' },
  rating: Number,
});

module.exports = mongoose.model('Sale', saleSchema);
