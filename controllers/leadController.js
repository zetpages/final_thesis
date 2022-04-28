const { Lead, Admin} = require('../models/models');
const ApiError = require('../error/ApiError');

class LeadController {
    async create(req, res, next) {
        try {
            let { name, adminId } = req.body;
            const lead = await Lead.create({ name, adminId });
            return res.json(lead);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let lead = await Lead.findAll({include: Admin});
        return res.json(lead);
    }
}

module.exports = new LeadController();