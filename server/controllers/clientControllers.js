const Client = require('../models/Client');
const Order = require('../models/Order');
const Master = require('../models/Master');

class ClientController {
    getClients = async (req, res) => {
        try {
            const client = await Client.find();
            return res.json(client);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    updateClient = async (req, res) => {
        try {
            const client = req.body;
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID not found' });
            }
            const updatedClient = await Client.findByIdAndUpdate(id, client, { new: true });
            return res.json(updatedClient);
        } catch (e) {
            res.status(500).json(e);
        }
    };
    deleteClient = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID not found' });
            }
            const client = await Client.findByIdAndDelete(id);

            const allClientOrders = client.client_order;
            let orderForDelete;

            for (let i = 0; i < allClientOrders.length; i++) {
                await Order.findByIdAndDelete(allClientOrders[i]);

                const masterWithCurrentOrder = await Master.findOne({ order: allClientOrders[i] });
                orderForDelete = allClientOrders[i];
                let masterAllOrder = masterWithCurrentOrder.order.filter(
                    (masterOrderId) => !allClientOrders.some((clientOrderId) => allClientOrders.includes(masterOrderId)),
                );
                let masterId = masterWithCurrentOrder._id;
                let addOrderIdToMaster = { order: masterAllOrder };
                await Master.findByIdAndUpdate(masterId, addOrderIdToMaster, { new: true });
            }

            return res.json(client);
        } catch (e) {
            res.status(500).json(e);
        }
    };
}

module.exports = new ClientController();
