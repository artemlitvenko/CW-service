const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { validationResult } = require('express-validator');

class AuthController {
    registrationAuth = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Uncorrect request', errors });
            }
            const { email, password } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: `User with email ${email} already exist` });
            }
            const hashPassword = await bcrypt.hash(password, 8);
            const user = new User({ email, password: hashPassword });
            await user.save();
            res.json({ message: 'User was created' });
        } catch (e) {
            console.log(e);
            res.send({ message: 'Server error' });
        }
    };

    loginAuth = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Uncorrect request', errors });
        }
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            const isPassValid = bcrypt.compareSync(password, user.password);
            if (!isPassValid) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            const token = jwt.sign({ id: user.id, email: user.email }, config.SECRET_KEY, { expiresIn: '1h' });
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        } catch (e) {
            console.log(e);
            res.send({ message: 'Server error' });
        }
    };
    googleLogin = async (req, res) => {
        try {
            const { email, token } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        } catch (e) {
            console.log(e);
            res.send({ message: 'Server error' });
        }
    };
    authAuth = async (req, res) => {
        try {
            const user = await User.findOne({ email: req.user.email });
            const token = jwt.sign({ email: user.email }, config.SECRET_KEY, { expiresIn: '1h' });
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        } catch (e) {
            console.log(e);
            res.send({ message: 'Server error' });
        }
    };
}

module.exports = new AuthController();

/*authAuth = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const token = jwt.sign({ id: user.id }, config.SECRET_KEY, { expiresIn: '1h' });
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (e) {
        console.log(e);
        res.send({ message: 'Server error' });
    }
};*/
