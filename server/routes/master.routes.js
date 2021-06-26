const Router = require('express');
const router = new Router();
const masterController = require('../controllers/masterControllers');
const { masterPostValidators } = require('../service/validators');
const { masterDeleteValidators } = require('../service/validators');
const { masterEditValidators } = require('../service/validators');

router.post('', masterPostValidators, masterController.postMaster);
router.get('', masterController.getMaster);
router.put('/:id', masterEditValidators, masterController.updateMaster);
router.delete('/:id', masterDeleteValidators, masterController.deleteMaster);

module.exports = router;
