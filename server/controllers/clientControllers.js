const Client = require('../models/Client');

class ClientController {
    /*postClient = async (req, res) => {
        try {
            const { name, email, order } = req.body;
            let client = await Client.findOne({ email: email }).exec();
            if (!client) {
                client = await Client.create({ name, email, order });
            }
            res.json(client);
        } catch (e) {
            console.log(e);
        }
    };*/

    /*getOneClient = async (req, res) => {
        try {
            let email = req.query.clientEmail;
            const client = await Client.findOne({ email: email }).exec();
            console.log(client._id);
            return res.json(client._id);
        } catch (e) {
            res.status(500).json(e);
        }
    };*/

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
                res.status(400).json({ message: 'ID не указан' });
            }
            const updatedClient = await Client.findByIdAndUpdate(id, client, { new: true });
            return res.json(updatedClient);
        } catch (e) {
            res.status(500).json(e);
        }
    };
}

module.exports = new ClientController();
