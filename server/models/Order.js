const {Schema, model, ObjectId} = require('mongoose');

const Order = new Schema({
    master: { type: ObjectId, ref: 'Master' },
    client: { type: ObjectId, ref: 'Client' },
    start_time: { type: Date },
    end_time: { type: Date }
});


module.exports = model('Order', Order);
