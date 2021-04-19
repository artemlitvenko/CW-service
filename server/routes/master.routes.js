const Router = require('express');
const router = new Router();
const masterController = require('../controllers/masterControllers');
const { masterValidators } = require('../service/validators');

router.post('', masterValidators, masterController.postMaster);
router.get('', masterController.getMaster);
router.put('/:id', masterController.updateMaster);
router.delete('/:id', masterController.deleteMaster);

module.exports = router;
