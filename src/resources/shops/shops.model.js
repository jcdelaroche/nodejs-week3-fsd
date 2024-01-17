const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    promotions : Object,
    coordinates: Object,
});

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;