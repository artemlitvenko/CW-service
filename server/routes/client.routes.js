const Router = require('express');
const router = new Router();
const clientController = require('../controllers/clientControllers');

//router.post('', clientController.postClient);
//router.get('/client', clientController.getOneClient);
router.get('', clientController.getClients);
router.put('/:id', clientController.updateClient);

module.exports = router;
