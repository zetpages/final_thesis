const Router = require('express');
const router = new Router();
const regularClassesController = require('../controllers/regularClassesController');


router.post('/', regularClassesController.create);
router.get('/', regularClassesController.getAll);

module.exports = router;