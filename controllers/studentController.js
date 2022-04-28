const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const {Student, Teacher, Group, Subscription, StudentGroup, TeacherStudent, Course, Level, Branch, Room, StudentStatus,
    Gender, RegularClasses, Admin, Discount, DiscountType, CourseType, SingleClass
} = require('../models/models')
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path');

const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}

class StudentController {
    async create(req, res, next) {
        try {
            const {
                email,
                password,
                name,
                teacherId,
                studentStatusId,
                phone,
                parentPhone,
                groupId,
                genderId,
                adminId,
                subscriptionId,
                parentName,
                birthday,
                discountId,
                balance
            } = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await Student.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)

            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const student = await Student.create({
                email,
                name,
                password: hashPassword,
                teacherId,
                studentStatusId,
                phone,
                parentPhone,
                groupId,
                genderId,
                adminId,
                subscriptionId,
                parentName,
                img: fileName,
                birthday,
                discountId,
                balance
            });



            const studentGroup = await StudentGroup.create({groupId, studentId: student.id});
            const studentTeacher = await TeacherStudent.create({teacherId, studentId: student.id});

            // const studentGroup = await Student.create(StudentGroup);


            const token = generateJwt(student.id, student.email, student.name);
            return res.json(student);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const student = await Student.findOne({where: {email}})
        if (!student) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, student.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(student.id, student.email, student.role)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        const student = await Student.findAll({include:
            [
                {
                    model: Subscription,
                },
                {
                    model: Admin
                },
                {
                    model: Teacher
                },
                {
                    model: Group,
                    include: [
                        {
                            model: RegularClasses,
                            include: [
                                { model: CourseType },
                                { model: Course },
                                { model: Room },
                                {
                                    model: SingleClass,
                                    include: [
                                        { model: CourseType },
                                        { model: Course },
                                        { model: Room }
                                    ]
                                }
                                // { model: Group }
                            ]
                        },
                        { model: Level },
                        { model: Branch },
                        { model: Teacher },
                        {
                            model: StudentGroup,
                            include: { model: Student}
                        }
                    ]
                },
                {
                    model: StudentStatus
                },
                {
                    model: Gender
                },
                {
                    model: Discount,
                    include: {model: DiscountType}
                }
            ]
        });
        res.json(student);
    }

    async getOne(req, res) {
        const {id} = req.params
        const student = await Student.findOne(
            {
                where: {id},
                include:
                    [
                        {
                            model: Subscription,
                        },
                        {
                            model: Admin
                        },
                        {
                            model: Teacher
                        },
                        {
                            model: Group,
                            include: [
                                {
                                    model: RegularClasses,
                                    include: [
                                        { model: CourseType },
                                        { model: Course },
                                        { model: Room },
                                        {
                                            model: SingleClass,
                                            include: [
                                                { model: CourseType },
                                                { model: Course },
                                                { model: Room }
                                            ]
                                        }
                                    ]
                                },
                                { model: Level },
                                { model: Branch },
                                { model: Teacher }
                            ]
                        },
                        {
                            model: StudentStatus
                        },
                        {
                            model: Gender
                        },
                        {
                            model: Discount,
                            include: {model: DiscountType}
                        }
                    ]
                }
            )
        return res.json(student)
    }


    async deleteOne(req, res, next) {
        Student.destroy({
            where: {
                id: req.params.id
            }
        }).then(count => {
            if (!count) {
                return res.status(404).send({error: 'No student found'});
            }
            res.status(204).send();
        }).catch(next);
    }
    
}

module.exports = new StudentController();