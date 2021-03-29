const Router = require('express');
const router = new Router();
const masterController = require('../controllers/masterControllers');

router.post('', masterController.postMaster);
//router.get('', masterController.getMasterCity);
router.get('', masterController.getMaster);
router.put('/:id', masterController.updateMaster);
router.delete('/:id', masterController.deleteMaster);

module.exports = router;
