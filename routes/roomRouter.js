const Router = require('express');
const router = new Router();
const roomController = require('../controllers/roomController');


router.post('/', roomController.create);
router.get('/', roomController.getAll);
router.delete('/:id', roomController.deleteOne);

module.exports = router;