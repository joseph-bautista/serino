const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

const authenticateJWT = require('../middleware/authMiddleware');

router.get('/', authenticateJWT, UserController.getAllUsers);

module.exports = router;
