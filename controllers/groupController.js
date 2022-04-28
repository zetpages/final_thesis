const { Group, RegularClasses, Teacher, Branch, Course, Level, Room} = require('../models/models');
const ApiError = require('../error/ApiError');

class GroupController {
    async create(req, res, next) {
        try {
            let { name, adminId, courseId } = req.body;
            const group = await Group.create({ name, adminId,  courseId });
            return res.json(group);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let group = await Group.findAll({include:
                [
                    {
                        model: RegularClasses,
                        include: [
                            { model: Course },
                            { model: Room }
                        ]
                    },
                    { model: Teacher },
                    { model:  Branch },
                    { model:  Level }
                ]});
        return res.json(group);
    }
}
module.exports = new GroupController();