const Router = require('express');
const router = new Router();
const leadController = require('../controllers/leadController');
const checkRole = require("../middleware/checkRoleMiddleware");


router.post('/',  leadController.create);
router.get('/', leadController.getAll);

module.exports = router;