const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const {Teacher} = require('../models/models')
const jwt = require('jsonwebtoken');

const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}

class TeacherController {
    async create(req, res, next) {
        const {email, password, name} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await Teacher.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const teacher = await Teacher.create({email, name, password: hashPassword})
        const token = generateJwt(teacher.id, teacher.email, teacher.name)
        // return res.json({token})
        return res.json(teacher)
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const teacher = await Teacher.findOne({where: {email}})
        if (!teacher) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, teacher.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(teacher.id, teacher.email, teacher.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        const teacher = await Teacher.findAll();
        res.json(teacher);
    }

    async getOne(req, res) {
        const {id} = req.params
        const teacher = await Teacher.findOne({where: {id}})
        return res.json(teacher)
    }
}

module.exports = new TeacherController()
