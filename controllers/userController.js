const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const {Admin, Teacher, Gender, Center, Role, AdminRole, User} = require('../models/models')
const jwt = require('jsonwebtoken');

const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}

class UserController {
    // async registration(req, res, next) {
    //     const {email, password, name } = req.body
    //     if (!email || !password) {
    //         return next(ApiError.badRequest('Некорректный email или password'))
    //     }
    //     const candidate = await Admin.findOne({where: {email}})
    //     if (candidate) {
    //         return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    //     }
    //     const hashPassword = await bcrypt.hash(password, 5)
    //     const admin = await Admin.create({email, name, password: hashPassword});
    //     const user = await User.create({email, password: hashPassword});
    //     const center = await Center.create({adminId: admin.id});
    //     const token = generateJwt(admin.id, admin.email);
    //
    //     const role = await Role.create({
    //         name: admin.id+'ADMIN',
    //         centerId: center.id
    //     });
    //
    //     const adminRole = await AdminRole.create({
    //         adminId: admin.id,
    //         roleId: role.id
    //     });
    //
    //     return res.json({token})
    // }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email )
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }

    async getAll(req, res) {
        const user = await User.findAll();
        res.json(user);
    }

    async getOne(req, res) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        return res.json(user)
    }
}


module.exports = new UserController()
