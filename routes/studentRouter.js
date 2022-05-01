const Router = require('express');
const router = new Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
// const checkRole = require('../middleware/checkRoleMiddleware');
// checkRole('ADMIN'),

router.post('/', studentController.create);
router.post('/login', studentController.login);
router.get('/auth', authMiddleware, studentController.check);
router.get('/', studentController.getAll);
router.get('/:id', studentController.getOne);
router.delete('/:id', studentController.deleteOne);
module.exports = router;

// make middle user for all user models using new User model