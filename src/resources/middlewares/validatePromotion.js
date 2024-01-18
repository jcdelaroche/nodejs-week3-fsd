const Joi = require('joi');

const validatePromotion = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().valid(
            'food',
            'clothes',
            'hightech',
            'other'        
        ).required(),
        discount: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ ok: false, error: error.details[0].message });
    }
    next();
}

module.exports = { validatePromotion }