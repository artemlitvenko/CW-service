const Client = require('../models/Client');

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
