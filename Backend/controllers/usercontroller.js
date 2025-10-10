const { v4: uuidv4 } = require('uuid');
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ Register User
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // ✅ Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists. Please use a different one.' });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password, // Password will be hashed by pre-save middleware
            role
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'User registration failed' });
    }
};

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Hide passwords
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // ✅ Use env secret key if available
        const token = jwt.sign(
            { user_id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret token',
            { expiresIn: '5h' }
        );

        res.status(200).json({
            token,
            message: 'Login successful',
            user: { username: user.username, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};
