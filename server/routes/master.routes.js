const Router = require('express');
const router = new Router();
const masterController = require('../controllers/masterControllers');
const { masterDeleteValidators } = require('../service/validators');
const { masterValidators } = require('../service/validators');

router.post('', masterValidators, masterController.postMaster);
router.get('', masterController.getMaster);
router.put('/:id', masterValidators, masterController.updateMaster);
router.delete('/:id', masterDeleteValidators, masterController.deleteMaster);

module.exports = router;
