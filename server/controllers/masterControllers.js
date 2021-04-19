const Master = require('../models/Master');
const Order = require('../models/Order');
const { validationResult } = require('express-validator');

class MasterController {
    postMaster = async (req, res) => {
        console.log('before errors', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Uncorrect request', errors });
        }
        try {
            const { name, rating, city } = req.body;
            console.log('after errors', req.body);
            const master = await Master.create({ name, rating, city });
            res.json(master);
        } catch (e) {
            console.log(e);
        }
    };

    getMaster = async (req, res) => {
        try {
            const master = await Master.find().populate({ path: 'city', select: 'city_name' });
            return res.json(master);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    updateMaster = async (req, res) => {
        try {
            const master = req.body;
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID не указан' });
            }
            const updatedMaster = await Master.findByIdAndUpdate(id, master, { new: true });
            return res.json(updatedMaster);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    deleteMaster = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID не указан' });
            }
            const master = await Master.findByIdAndDelete(id);

            const allMasterOrders = master.order;
            for (let i = 0; i < allMasterOrders.length; i++) {
                await Order.findByIdAndDelete(allMasterOrders[i]);
            }

            return res.json(master);
        } catch (e) {
            res.status(500).json(e);
        }
    };
}

module.exports = new MasterController();
