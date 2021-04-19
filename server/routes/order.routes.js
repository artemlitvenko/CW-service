const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderControllers');
const { orderValidators } = require('../service/validators');

router.get('/master', orderController.getMasterForOrder);
router.post('', orderValidators, orderController.postOrder);
router.get('', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
