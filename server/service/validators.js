import { maxLength, maxPasswordLength, maxRatingLength, maxSizeLength, minLength, minRatingLength, minSizeLength } from './validationConstants';

const { check } = require('express-validator');

exports.registerValidators = [
    check('email', 'Uncorrect email').isEmail().trim(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: minLength, max: maxPasswordLength }),
];

exports.loginValidators = [
    check('email', 'Uncorrect email').isEmail().isLength({ min: minLength, max: maxLength }).trim(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: minLength, max: maxPasswordLength }),
];

exports.cityValidators = [check('city_name', 'Name must be longer than 3 and shorter than 30').isLength({ min: minLength, max: maxLength }).trim()];

exports.masterValidators = [
    check('name', 'Name must be longer than 3 and shorter than 30').isLength({ min: minLength, max: maxLength }).trim(),
    check('rating', 'Rating must be a number between 0 and 5').isFloat({ min: minRatingLength, max: maxRatingLength }),
    check('city', 'City must be MongoId').isMongoId().trim(),
];

exports.orderValidators = [
    check('client_name', 'Name must be longer than 3 and shorter than 30').isLength({ min: minLength, max: maxLength }).trim(),
    check('client_email', 'Uncorrect email').isEmail().isLength({ min: minLength, max: maxLength }).trim(),
    check('master', 'Master must be MongoId').isMongoId().trim(),
    check('city', 'City must be MongoId').isMongoId().trim(),
    check('size', 'Size must be Number').isFloat({ min: minSizeLength, max: maxSizeLength }),
    check('start_time', 'Start time must be Date').isISO8601(),
    check('end_time', 'End time must be Date').isISO8601(),
];
