const { Schema, model, ObjectId } = require('mongoose');

const Master = new Schema({
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    city: { type: ObjectId, ref: 'City' },
    order: [{ type: ObjectId, ref: 'Order' }],
});

module.exports = model('Master', Master);
