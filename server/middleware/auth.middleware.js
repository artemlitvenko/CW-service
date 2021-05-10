const jwt = require('jsonwebtoken');
const config = require('../config');

// получаем по токену пользователя и возвращаем обратно
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

        // нужно возвращать результат декода не в виде id а в виде email, это позволит работать с любым видом токена

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

/*module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    console.log('req.headers.authorization.split()[1]', req.headers.authorization.split(' ')[1]);
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth error' });
        }
        const decoded = jwt.verify(token, config.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Auth error' });
    }
};*/
