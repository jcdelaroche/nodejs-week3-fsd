const shopModel = require('./shops.model');
const joi = require('joi');

module.exports = {
    async addPromotion(req, res) {
        const {id} = req.params;
        try {
            const shop = await shopModel.findById(id);
            shop.promotions.push({...req.body});
            await shop.save();
            return res.status(200).json({ok: true, data: shop});
        } catch (err) {
            return res.status(500).json({ok: false, data: err})
        }
    },

    async getPromotionsByName(req, res) {
        const schema = joi.object({
            name: joi.string()
        });
        const {error} = schema.validate(req.query);
        if (error) {
            return res.status(400).json({ok: false, data: error.details[0].message});
        }
        const {name} = req.query;
        try {
            const promotion = await shopModel.find({'promotions.name': name});
            return res.status(200).json({ok: true, data: promotion});
        } catch (err) {
            return res.status(500).json({ok: false, data: err})
        }
    },

    getPromotionsByCategory(req, res) {
        const schema = joi.object({
            category: joi.string().valid(
                'food',
                'clothes',
                'hightech',
                'other'
            ).required()
        });
        const {error} = schema.validate({category: req.params.category});
        if (error) {
            return res.status(400).json({ok: false, data: error.details[0].message});
        }
        const {category} = req.params.category;
        try {
            const promotion = shopModel.find({'promotions.category': category});
            return res.status(200).json({ok: true, data: promotion});
        } catch (err) {
            return res.status(500).json({ok: false, data: err})
        }
    },

    async getPromotionsByShop(req, res) {
        const {id} = req.params;
        try {
            const shop = await shopModel.findById(id);
            return res.status(200).json({ok: true, data: shop.promotions});
        } catch (err) {
            return res.status(500).json({ok: false, data: err})
        }
    }
}