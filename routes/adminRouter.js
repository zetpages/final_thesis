const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', adminController.registration)
router.post('/login', adminController.login)
router.get('/auth', authMiddleware, adminController.check)
router.get('/',checkRole('ADMIN'), authMiddleware, adminController.getAll)
router.get('/:id', checkRole('ADMIN'), authMiddleware, adminController.getOne)
module.exports = router;