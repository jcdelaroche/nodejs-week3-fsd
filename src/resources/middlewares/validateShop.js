const Joi = require('joi');

const validateShop = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        promotions: Joi.array().optional(),
        adress: Joi.string().optional(),
        postalCode: Joi.number().min(5).optional(),
        country: Joi.string().optional(),
        coordinates: Joi.object().optional(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ ok: false, error: error.details[0].message });
    }
    next();
}

module.exports = { validateShop }