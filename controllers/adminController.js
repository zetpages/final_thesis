const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const {Admin, Teacher, Gender, Center} = require('../models/models')
const jwt = require('jsonwebtoken');

const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}

class AdminController {
    async registration(req, res, next) {
        const {email, password, name } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await Admin.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const admin = await Admin.create({email, name, password: hashPassword})
        const token = generateJwt(admin.id, admin.email )
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const admin = await Admin.findOne({where: {email}})
        if (!admin) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, admin.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(admin.id, admin.email )
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        const admin = await Admin.findAll({include: [
            {model: Teacher},
            {model: Gender}
        ]});
        res.json(admin);
    }

    async getOne(req, res) {
        const {id} = req.params
        const admin = await Admin.findOne({where: {id}}, {include: Gender})
        return res.json(admin)
    }
}


module.exports = new AdminController()
