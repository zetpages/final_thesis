const Router = require('express');
const router = new Router();
const studentStatusController = require('../controllers/studentStatusController');


router.post('/', studentStatusController.create);
router.get('/', studentStatusController.getAll);

module.exports = router;