const { check } = require('express-validator');

exports.registerValidators = [
    check('email', 'Uncorrect email').isEmail().trim(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 15 }),
];

exports.loginValidators = [
    check('email', 'Uncorrect email').isEmail().isLength({ min: 3, max: 30 }).trim(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 15 }),
];

exports.cityValidators = [check('city_name', 'Name must be longer than 3 and shorter than 30').isLength({ min: 3, max: 30 }).trim()];

exports.masterValidators = [
    check('name', 'Name must be longer than 3 and shorter than 30').isLength({ min: 3, max: 30 }).trim(),
    check('rating', 'Rating must be a number between 0 and 5').isFloat({ min: 0, max: 5 }),
    check('city', 'City must be MongoId').isMongoId().trim(),
];

exports.orderValidators = [
    check('client_name', 'Name must be longer than 3 and shorter than 30').isLength({ min: 3, max: 30 }).trim(),
    check('client_email', 'Uncorrect email').isEmail().isLength({ min: 3, max: 30 }).trim(),
    check('master', 'Master must be MongoId').isMongoId().trim(),
    check('city', 'City must be MongoId').isMongoId().trim(),
    check('size', 'Size must be Number').isFloat({ min: 3600000, max: 10800000 }),
    check('start_time', 'Start time must be Date').isISO8601(),
    check('end_time', 'End time must be Date').isISO8601(),
];
