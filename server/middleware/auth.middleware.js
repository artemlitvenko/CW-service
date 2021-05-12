const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, config.SECRET_KEY);
            req.user = decodedData;
        } else {
            decodedData = jwt.decode(token);
            req.user = decodedData;
        }
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Auth error' });
    }
};
