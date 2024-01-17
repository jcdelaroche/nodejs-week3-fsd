const Joi = require('joi');

const validateShop = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        owner: Joi.string().required(),
        promotions: Joi.array().required(),
        adress: Joi.string().required(),
        postalCode: Joi.number().min(5).required(),
        country: Joi.string().required(),

    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ ok: false, error: error.details[0].message });
    }
    next();
}

module.exports = { validateShop }