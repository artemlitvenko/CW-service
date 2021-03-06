const { validationResult } = require('express-validator');
const Master = require('../models/Master');
const Order = require('../models/Order');
const Client = require('../models/Client');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const mailer = require('../service/nodemailer');

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
            let clientDay = moment(startDate).format('YYYY MM DD');

            for (let i = 0; i < masters.length; i++) {
                let orders = masters[i].order;
                let isBusy = false;

                for (let ii = 0; ii < orders.length; ii++) {
                    let ordersStartTime = orders[ii].start_time;
                    let ordersEndTime = orders[ii].end_time;
                    let clientStartTime = new Date(startDate);
                    let ordersStartTimeShort = moment(ordersStartTime).format('YYYY MM DD');

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

                //end for ii

                if (!isBusy) {
                    const masterList = await Master.find({ _id: masters[i]._id });
                    mastersResultList.push(masterList);
                }
            }

            //end for i

            let mastersReadyList = mastersResultList.flat();
            return res.json(mastersReadyList);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    // End getMasterForOrder

    postOrder = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Incorrect request', errors });
        }
        try {
            const { client_name, client_email, master, city, size, start_time, end_time } = req.body;
            let clientCreate = await Client.findOne({ client_email: client_email }).exec();
            if (!clientCreate) {
                clientCreate = await Client.create({ client_name, client_email });
            }
            let client = clientCreate._id;

            const order = await Order.create({ master, client, city, size, start_time, end_time });
            res.json(order);

            let orderId = order._id;

            let currentClient = await Client.findById(client);
            let currentClientOrder = currentClient.client_order;
            currentClientOrder.push(orderId);
            let addOrderIdToClient = { client_order: currentClientOrder };
            await Client.findByIdAndUpdate(client, addOrderIdToClient, { new: true });

            let currentMaster = await Master.findById(master);
            let currentMasterOrder = currentMaster.order;
            currentMasterOrder.push(orderId);
            let addOrderIdToMaster = { order: currentMasterOrder };
            await Master.findByIdAndUpdate(master, addOrderIdToMaster, { new: true });

            const message = {
                to: req.body.client_email,
                subject: 'Thank you! Your order has been successfully received!',
                text: `We will contact you shortly at the email address (${req.body.client_email}) you provided to clarify your order.`,
            };
            mailer(message);
        } catch (e) {
            console.log(e);
        }
    };

    getOrder = async (req, res) => {
        try {
            const order = await Order.find().populate({ path: 'master', select: 'name' }).populate({ path: 'client' });
            return res.json(order);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    updateOrder = async (req, res) => {
        try {
            const { master, client_name, client_email, city, size, start_time, end_time } = req.body.body;
            console.log('req.body.body', req.body.body);
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID not found' });
            }
            let order = await Order.findById(id);

            let clientId = order.client._id;
            let clientData = { client_name: client_name, client_email: client_email };
            await Client.findByIdAndUpdate(clientId, clientData, { new: true });

            let oldMasterId = order.master._id;
            if (!oldMasterId == master) {
                let editOldMaster = await Master.findById(oldMasterId);
                let masterAllOrder = editOldMaster.order.filter((deleteId) => deleteId != id);
                let addOrderIdToMaster = { order: masterAllOrder };
                await Master.findByIdAndUpdate(oldMasterId, addOrderIdToMaster, { new: true });
            }

            let orderData = { start_time: start_time, end_time: end_time, size: size, master: master, city: city };
            const updatedOrder = await Order.findByIdAndUpdate(id, orderData, { new: true });
            return res.json(updatedOrder);
        } catch (e) {
            res.status(500).json(e);
            console.log(e);
        }
    };

    deleteOrder = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID not found' });
            }

            const order = await Order.findByIdAndDelete(id);

            const masterWithCurrentOrder = await Master.findOne({ order: id });
            let masterAllOrder = masterWithCurrentOrder.order.filter((deleteId) => deleteId != id);
            let masterId = masterWithCurrentOrder._id;
            let addOrderIdToMaster = { order: masterAllOrder };
            await Master.findByIdAndUpdate(masterId, addOrderIdToMaster, { new: true });

            // START Delete orderId in Client

            const clientWithCurrentOrder = await Client.findOne({ client_order: id });
            let clientAllOrder = clientWithCurrentOrder.client_order.filter((deleteId) => deleteId != id);
            let clientId = clientWithCurrentOrder._id;
            let addOrderIdToClient = { client_order: clientAllOrder };
            await Client.findByIdAndUpdate(clientId, addOrderIdToClient, { new: true });

            // END Delete orderId in Client

            return res.json(order);
        } catch (e) {
            res.status(500).json(e);
        }
    };
}

module.exports = new OrderController();
