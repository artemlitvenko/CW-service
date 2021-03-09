const Router = require('express');
const router = new Router();
const Order = require('../models/Order.js');


router.post("", async (req, res) => {
    try {
        const {master, client, start_time, end_time} = req.body;
        const order = await Order.create({master, client, start_time, end_time});
        res.json(order);
    } catch (e) {
        console.log(e)
        //res.status(500).json(e);
    }
});
router.get("", async (req, res) => {
    try {
        const order = await Order.find();
        return res.json(order);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put("", async (req, res) => {
    try {
        const order = req.body;
        if(!order._id) {
            res.status(400).json({ message: 'ID не указан' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(order._id, order, {new: true});
        return res.json(updatedOrder);

    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete(":id", async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({ message: 'ID не указан' });
        }
        const order = await Order.findByIdAndDelete(id);
        return res.json(order);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;