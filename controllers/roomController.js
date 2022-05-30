const { Room} = require('../models/models');
const ApiError = require('../error/ApiError');

class RoomController {
    async create(req, res, next) {
        try {
            let {name, description, centerId, branchId } = req.body;
            const room = await Room.create({ name, description, centerId, branchId });
            return res.json(room);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let room = await Room.findAll();
        return res.json(room);
    }
}

module.exports = new RoomController();