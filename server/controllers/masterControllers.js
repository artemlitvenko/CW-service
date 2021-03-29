const Master = require('../models/Master');

class MasterController {
    postMaster = async (req, res) => {
        debugger
        try {
            const {name, rating, city} = req.body;
            const master = await Master.create({name, rating, city});
            res.json(master);
        } catch (e) {
            console.log(e)
        }
    }

    getMaster = async (req, res) => {
        try {
            const master = await Master.find().populate({ path: 'city', select: 'city_name' });
            return res.json(master);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    updateMaster = async (req, res) => {
        try {
            const master = req.body;
            const {id} = req.params;
            if(!id) {
                res.status(400).json({ message: 'ID не указан' });
            }
            const updatedMaster = await Master.findByIdAndUpdate(id, master, {new: true});
            console.log(updatedMaster);
            return res.json(updatedMaster);

        } catch (e) {
            res.status(500).json(e);
        }
    }

    deleteMaster = async (req, res) => {
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
    }
}

module.exports = new MasterController();