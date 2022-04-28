const Router = require('express');
const router = new Router();
const subscriptionController = require('../controllers/subscriptionController');
const checkRole = require("../middleware/checkRoleMiddleware");


router.post('/', subscriptionController.create);
router.get('/', subscriptionController.getAll);

module.exports = router;