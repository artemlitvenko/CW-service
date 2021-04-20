const City = require('../models/City.js');
const { validationResult } = require('express-validator');

class CityController {
    postCity = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Uncorrect request', errors });
        }
        try {
            const { city_name } = req.body;
            const city = await City.create({ city_name });
            res.json(city);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    getCity = async (req, res) => {
        try {
            const city = await City.find();
            return res.json(city);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    updateCity = async (req, res) => {
        try {
            const city = req.body;
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID не указан' });
            }
            const updatedCity = await City.findByIdAndUpdate(id, city, { new: true });
            return res.json(updatedCity);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    deleteCity = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'ID не указан' });
            }
            const city = await City.findByIdAndDelete(id);
            return res.json(city);
        } catch (e) {
            console.log(e);
        }
    };
}

module.exports = new CityController();
