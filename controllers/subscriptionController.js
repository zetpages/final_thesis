const { Subscription } = require('../models/models');
const ApiError = require('../error/ApiError');

class SubscriptionController {
    async create(req, res, next) {
        try {
            let { name} = req.body;
            const subscription = await Subscription.create({ name });
            return res.json(subscription);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let sub = await Subscription.findAll();
        return res.json(sub);
    }
}



module.exports = new SubscriptionController();