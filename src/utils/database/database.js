const mongoose = require('mongoose');

const config = require('../../../config.json')

const connect = async () => {
    const con = await mongoose.connect(config.database.url);
    console.log('Connected to the database!');
    return con;
}

module.exports = {
    connect,
};