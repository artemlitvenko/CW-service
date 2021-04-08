const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderControllers');

router.get('/master', orderController.getMasterForOrder);
router.post('', orderController.postOrder);
router.get('', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
