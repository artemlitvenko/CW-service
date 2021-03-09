const {Schema, model, ObjectId} = require('mongoose');

const Master = new Schema({
    name: { type: String, required: true },
    city: { type: ObjectId, ref: 'City' }
});


module.exports = model('Master', Master);
