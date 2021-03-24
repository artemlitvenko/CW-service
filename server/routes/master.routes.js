const Router = require('express');
const router = new Router();
const Master = require('../models/Master.js');


router.post("", async (req, res) => {
    try {
        const {name, city} = req.body;
        const master = await Master.create({name, city});
        res.json(master);
    } catch (e) {
        console.log(e)
        //res.status(500).json(e);
    }
});
router.get("", async (req, res) => {
    try {
        const master = await Master.find();
        return res.json(master);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const master = req.body;
        if(!master._id) {
            res.status(400).json({ message: 'ID не указан' });
        }
        const updatedMaster = await Master.findByIdAndUpdate(master._id, master, {new: true});
        return res.json(updatedMaster);

    } catch (e) {
        res.status(500).json(e);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({ message: 'ID не указан' });
        }
        const master = await Master.findByIdAndDelete(id);
        return res.json(master);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;