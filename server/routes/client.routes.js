const Router = require('express');
const router = new Router();
const Client = require('../models/Client.js');


router.post("", async (req, res) => {
    try {
        const {name, email, master, order} = req.body;
        const client = await Client.create({name, email, master, order});
        res.json(client);
    } catch (e) {
        console.log(e)
        //res.status(500).json(e);
    }
});
router.get("", async (req, res) => {
    try {
        const client = await Client.find();
        return res.json(client);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put("", async (req, res) => {
    try {
        const client = req.body;
        if(!client._id) {
            res.status(400).json({ message: 'ID не указан' });
        }
        const updatedClient = await Client.findByIdAndUpdate(client._id, client, {new: true});
        return res.json(updatedClient);

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
        const client = await Client.findByIdAndDelete(id);
        return res.json(client);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;