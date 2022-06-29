const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: String,
    email: String, 
    phone: String,

});

module.exports = mongoose.model('Client', clientSchema);