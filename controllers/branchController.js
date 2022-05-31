const {Branch, Room} = require('../models/models');
const ApiError = require('../error/ApiError');

class branchController {
    async create(req, res, next) {
        try {
            let {name, address, centerId } = req.body;
            const branch = await Branch.create({ name, address, centerId });
            return res.json(branch);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let branch = await Branch.findAll();
        return res.json(branch);
    }

    async deleteOne(req, res, next) {
        Branch.destroy({
            where: {
                id: req.params.id
            }
        }).then(count => {
            if (!count) {
                return res.status(404).send({error: 'No branch found'});
            }
            res.status(204).send();
        }).catch(next);
    }
}

module.exports = new branchController();