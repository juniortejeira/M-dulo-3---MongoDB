const { Schema, model } = require('mongoose');

const data_veri = new Schema ({
    users:String,
    passwords:String,
},{versionKey: false});

module.exports = model('data_verification', data_veri); 