const Router = require('express');
const router = new Router();
const adminRouter = require('./adminRouter');
const teacherRouter = require('./teacherRouter');
const studentRouter = require('./studentRouter');
const taskRouter = require('./taskRouter');
const taskCategoryRouter = require('./taskCategoryRouter');
const subscriptionRouter = require('./subscriptionRouter');
const leadRouter = require('./leadRouter');
const groupRouter = require('./groupRouter');
const courseRouter = require('./courseRouter');
const studentStatusRouter = require('./studentStatusRouter');
const regularClassesRouter = require('./regularClassesRouter');
const genderRouter = require('./genderRouter')


router.use('/admin', adminRouter);
router.use('/teacher', teacherRouter);
router.use('/student', studentRouter);
router.use('/task', taskRouter);
router.use('/task-category', taskCategoryRouter);
router.use('/subscription', subscriptionRouter);
router.use('/lead', leadRouter);
router.use('/group', groupRouter);
router.use('/course', courseRouter);
router.use('/student-status', studentStatusRouter);
router.use('/regular-classes', regularClassesRouter);
router.use('/gender', genderRouter);


module.exports = router;
