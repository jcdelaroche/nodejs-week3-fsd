const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'merchant', 'user'] },
    shops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
