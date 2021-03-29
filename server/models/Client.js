const { Schema, model, ObjectId } = require('mongoose');

const Client = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    master: { type: ObjectId, ref: 'Master' },
    order: { type: ObjectId, ref: 'Order' },
});

module.exports = model('Client', Client);
