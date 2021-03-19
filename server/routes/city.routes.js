const Router = require('express');
const router = new Router();
const City = require('../models/City.js');

router.post("", async (req, res) => {
    try {
        const {city_name} = req.body;
        const city = await City.create({city_name});
        res.json(city);
    } catch (e) {
        res.status(500).json(e);
    }
});
router.get("", async (req, res) => {
    try {
        const city = await City.find();
        return res.json(city);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const city = req.body;
        if(!city._id) {
            res.status(400).json({ message: 'ID не указан' });
        }
        const updatedCity = await City.findByIdAndUpdate(city._id, city, {new: true});
        return res.json(updatedCity);
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
        const city = await City.findByIdAndDelete(id);
        return res.json(city);
    } catch (e) {
        console.log(e)
        //res.status(500).json(e);
    }
});

module.exports = router;