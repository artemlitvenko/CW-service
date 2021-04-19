const Router = require('express');
const router = new Router();
const cityController = require('../controllers/cityControllers');
const { cityValidators } = require('../service/validators');

router.post('', cityValidators, cityController.postCity);
router.get('', cityController.getCity);
router.put('/:id', cityController.updateCity);
router.delete('/:id', cityController.deleteCity);

module.exports = router;
