const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        default: uuidv4 // Automatically generate a UUID for user_id
    },
    username: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['customer', 'provider'], 
        default: 'customer'
    }
});


UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
