const Router = require('express');
const router = new Router();
const taskCategoryController = require('../controllers/taskCategoryController');
const checkRole = require("../middleware/checkRoleMiddleware");


router.post('/', taskCategoryController.create);
router.get('/', taskCategoryController.getAll);

module.exports = router;

