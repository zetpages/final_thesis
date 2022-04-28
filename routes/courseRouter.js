const Router = require('express');
const router = new Router();
const courseController = require('../controllers/courseController');
const checkRole = require("../middleware/checkRoleMiddleware");


router.post('/', courseController.create);
router.get('/', courseController.getAll);

module.exports = router;