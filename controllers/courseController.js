const { Course } = require('../models/models');
const ApiError = require('../error/ApiError');

class CourseController {
    async create(req, res, next) {
        try {
            let { name} = req.body;
            const course = await Course.create({ name });
            return res.json(course);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let sub = await Course.findAll();
        return res.json(sub);
    }
}



module.exports = new CourseController();