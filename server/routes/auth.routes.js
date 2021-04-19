const Router = require('express');
const authController = require('../controllers/authControllers');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const { registerValidators, loginValidators } = require('../service/validators');

router.post('/registration', registerValidators, authController.registrationAuth);
router.post('/login', loginValidators, authController.loginAuth);
router.get('/auth', authMiddleware, authController.authAuth);

module.exports = router;
