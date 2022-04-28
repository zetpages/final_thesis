const { StudentStatus} = require('../models/models');
const ApiError = require('../error/ApiError');

class StudentStatusController {
    async create(req, res, next) {
        try {
            let { name} = req.body;
            const studentStatus = await StudentStatus.create({ name });
            return res.json(studentStatus);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let sStatus = await StudentStatus.findAll();
        return res.json(sStatus);
    }
}

module.exports = new StudentStatusController();