const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref:'Client'},
    station: {type: mongoose.Schema.Types.ObjectId, ref:'Station'}
    //attendant: {type: mongoose.Schema.Types.ObjectId, ref:'Attendant'},
    //rating: {type: mongoose.Schema.Types.ObjectId, ref:'Rating'}
});

module.exports = mongoose.model('Sale', saleSchema);