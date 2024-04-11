const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
    serverId: {
        type: String,
        required: true,
    },
    songs: {
        type: [{
            title: String,
            artist: String,
            duration: Number,
            url: String,
        }],
        default: [],
    },
});

module.exports = mongoose.model('Queue', queueSchema);