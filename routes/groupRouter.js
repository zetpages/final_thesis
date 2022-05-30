const Router = require('express');
const router = new Router();
const groupController = require('../controllers/groupController');
const checkRole = require("../middleware/checkRoleMiddleware");
const studentController = require("../controllers/groupController");


router.post('/',  groupController.create);
router.get('/', groupController.getAll);
router.get('/:id', groupController.getOneGroup);
router.delete('/:id', groupController.deleteOneGroup);

module.exports = router;