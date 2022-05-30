const { Group, RegularClasses, Teacher, Branch, Course, Level, Room, Student,
    Subscription,
    Admin,
    CourseType,
    SingleClass,
    StudentStatus,
    Gender,
    Discount,
    DiscountType, StudentGroup, GroupStatus
} = require('../models/models');
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
                    { model: Student },
                    { model:  Branch },
                    { model:  Level }
                ]});
        return res.json(group);
    }

    async getOneGroup(req, res) {
        const {id} = req.params
        const group = await Group.findOne(
            {
                where: {id},
                include: [
                    {model: Branch, include: {model: Room}},
                    {model: GroupStatus},
                    {model: Level},
                    {model: Teacher},
                    {model: Student},
                    {model: RegularClasses, include: [
                            {model: Course},
                            {model: Room},
                            {model: SingleClass},
                        ]},
                ]
            }
        )
        return res.json(group)
    }

    async deleteOneGroup(req, res, next) {
        Group.destroy({
            where: {
                id: req.params.id
            }
        }).then(count => {
            if (!count) {
                return res.status(404).send({error: 'No group found'});
            }
            res.status(204).send();
        }).catch(next);
    }
}
module.exports = new GroupController();