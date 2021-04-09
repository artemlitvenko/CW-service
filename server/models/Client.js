const { Schema, model, ObjectId } = require('mongoose');

const Client = new Schema({
    client_name: { type: String, required: true },
    client_email: { type: String, required: true, unique: true },
    client_order: { type: ObjectId, ref: 'Order' },
});

module.exports = model('Client', Client);
