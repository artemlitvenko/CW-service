const Master = require('../models/Master');
const Order = require('../models/Order');
const { validationResult } = require('express-validator');

class MasterController {
    postMaster = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Incorrect request', errors });
        }
        try {
            const { name, rating, city } = req.body;
            const master = await Master.create({ name, rating, city });
            const returnMaster = await Master.findById(master._id).populate({ path: 'city', select: 'city_name' });
            return res.json(returnMaster);
        } catch (e) {
            res.status(500).json(e);
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Incorrect request', errors });
        }
        try {
            const master = req.body;
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID not found' });
            }
            await Master.findByIdAndUpdate(id, master, { new: true });
            const returnMaster = await Master.findById(id).populate({ path: 'city', select: 'city_name' });
            return res.json(returnMaster);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    deleteMaster = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Incorrect request', errors });
        }
        try {
            const { id } = req.params;
            /*if (!id) {
                res.status(400).json({ message: 'ID not found' });
            }*/
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
