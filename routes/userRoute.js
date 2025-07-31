const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/roleMiddleware');

// All routes below are protected AND admin-only
router.use(auth);       // must be logged in
router.use(isAdmin('admin'));  // must be admin

router.get('/', getAllUsers);         // View all users
router.put('/:id', updateUser);       // Update a user
router.delete('/:id', deleteUser);    // Delete a user

module.exports = router; 
