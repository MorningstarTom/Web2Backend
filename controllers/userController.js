const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// GET /api/users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // hide password
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch users', err });
    }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
    const { username, email, role } = req.body;
    try {
        const updated = await User.findByIdAndUpdate(
        req.params.id,
        { username, email, role },
        { new: true }
        ).select('-password');
        res.json(updated);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to update user', err });
    }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to delete user', err });
    }
};
