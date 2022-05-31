const Router = require('express');
const router = new Router();
const branchController = require('../controllers/branchController');


router.post('/', branchController.create);
router.get('/', branchController.getAll);
router.delete('/:id', branchController.deleteOne);

module.exports = router;