const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashed });
        res.json({ msg: 'User created', user: newUser });
    } catch (err) {
        res.status(500).json({ msg: 'Signup error', err });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) 
            return res.status(400).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return res.status(401).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (err) {
        res.status(500).json({ msg: 'Login error', err });
    }
};

exports.logout = async (req, res) => {
    try {
        // JWT logout is handled on client by removing token
        res.status(200).json({ msg: 'Logout successful. Please remove token on client side.' });
    } catch (error) {
        res.status(500).json({ msg: 'Logout failed.', error });
    }
};

