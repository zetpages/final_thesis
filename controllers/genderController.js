const { Gender, User, Admin} = require('../models/models');
const ApiError = require('../error/ApiError');

class genderController {
    async create(req, res, next) {
        try {
            let { name } = req.body;
            const gender = await Gender.create({ name});
            return res.json(gender);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let gender = await Gender.findAll({include: Admin});
        return res.json(gender);
    }
}

module.exports = new genderController();