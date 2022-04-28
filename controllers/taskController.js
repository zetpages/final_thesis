const { Task, TaskCategory} = require('../models/models');
const ApiError = require('../error/ApiError');

class TaskController {
    async create(req, res, next) {
        try {
            let { title, description, label, expirationDate, taskCategoryId, adminId } = req.body;
            const task = await Task.create({ title, description, expirationDate, taskCategoryId, label, adminId });
            return res.json(task);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let task = await Task.findAll({include: TaskCategory});
        return res.json(task);
    }
}

module.exports = new TaskController();