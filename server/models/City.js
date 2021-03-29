const { Schema, model } = require('mongoose');

const City = new Schema({
    city_name: { type: String, required: true, unique: true },
});

module.exports = model('City', City);
