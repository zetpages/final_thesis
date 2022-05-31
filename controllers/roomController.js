const { Room} = require('../models/models');
const ApiError = require('../error/ApiError');
const {Student} = require("../final_thesis/models/models");

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


    async deleteOne(req, res, next) {
        Room.destroy({
            where: {
                id: req.params.id
            }
        }).then(count => {
            if (!count) {
                return res.status(404).send({error: 'No room found'});
            }
            res.status(204).send();
        }).catch(next);
    }
}

module.exports = new RoomController();