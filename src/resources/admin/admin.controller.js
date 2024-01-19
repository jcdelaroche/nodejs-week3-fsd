const shopModel = require('../shops/shops.model');
const userModel = require('../users/users.model');

module.exports = {
    async explosion(req, res) {
        const user = await userModel.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ok: false, data: 'You are not allowed to delete all data'})
        }

        try {
            await shopModel.deleteMany();
            await userModel.deleteMany();
            return res.status(200).json({ok: true, data: 'All data deleted'});
        } catch (err) {
            return res.status(500).json({ok: false, data: err})
        }
    }
}