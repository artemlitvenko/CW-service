const Master = require('../models/Master');
const Order = require('../models/Order');
const Client = require('../models/Client');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

class OrderController {
    getMasterForOrder = async (req, res) => {
        let orderCity = req.query.orderCity;
        let startDate = req.query.startDate;
        let endDate = req.query.endDate;

        try {
            const master = await Master.find().populate('order');
            const masters = master.filter((city) => {
                return city.city._id == orderCity;
            });

            let mastersResultList = [];
            let clientDay = startDate.slice(0, 10);

            for (let i = 0; i < masters.length; i++) {
                let orders = masters[i].order;
                let isBusy = false;

                for (let ii = 0; ii < orders.length; ii++) {
                    let ordersStartTime = orders[ii].start_time;
                    let ordersEndTime = orders[ii].end_time;
                    let clientStartTime = new Date(startDate);

                    let ordersStartTimeShort = ordersStartTime.toISOString().slice(0, 10);
                    let ordersIdMaster = orders[ii].master;

                    let oldOrder = [moment(+ordersStartTime), moment(+ordersEndTime)];
                    let newOrder = [moment(+clientStartTime), moment(+endDate)];
                    let range1 = moment.range(newOrder);
                    let range2 = moment.range(oldOrder);

                    if (clientDay !== ordersStartTimeShort) {
                        isBusy = false;
                    } else if (range1.overlaps(range2)) {
                        isBusy = true;
                        break;
                    }
                }
                if (!isBusy) {
                    const masterList = await Master.find({ _id: masters[i]._id });
                    mastersResultList.push(masterList);
                }
            }
            let mastersReadyList = mastersResultList.flat();
            return res.json(mastersReadyList);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    // End getMasterForOrder

    postOrder = async (req, res) => {
        try {
            const { client_name, client_email, master, city, size, start_time, end_time } = req.body;
            console.log('req.body', req.body);
            let clientCreate = await Client.findOne({ client_email: client_email }).exec();
            if (!clientCreate) {
                clientCreate = await Client.create({ client_name, client_email });
            }
            let client = clientCreate._id;
            console.log('client', client);

            const order = await Order.create({ master, client, city, size, start_time, end_time });
            res.json(order);
            let orderId = order._id;
            console.log('orderId', orderId);

            let addOrderId = { client_order: orderId };

            await Client.findByIdAndUpdate(client, addOrderId, { new: true });
        } catch (e) {
            console.log(e);
        }
    };

    getOrder = async (req, res) => {
        try {
            const order = await Order.find();
            return res.json(order);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    updateOrder = async (req, res) => {
        try {
            const order = req.body;
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID не указан' });
            }
            const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true });
            console.log(updatedOrder);
            return res.json(updatedOrder);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    deleteOrder = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID не указан' });
            }
            const order = await Order.findByIdAndDelete(id);
            return res.json(order);
        } catch (e) {
            res.status(500).json(e);
        }
    };
}

module.exports = new OrderController();
