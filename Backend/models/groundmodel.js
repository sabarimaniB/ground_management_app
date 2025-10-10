const mongoose = require('mongoose');

const groundSchema = new mongoose.Schema({
    provider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Cricket', 'Football'],
        required: true
    },
    image: {
        type: String,
        required: false
    },
    charges: {
        type: Number,
        required: true
    },
    slots: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ground = mongoose.model('Ground', groundSchema);
module.exports = Ground;
