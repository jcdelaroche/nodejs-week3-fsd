const mongoose = require('mongoose');

module.exports = async () => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h9lqxne.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(uri);
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
}; 