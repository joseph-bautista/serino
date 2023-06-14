const express = require('express');
const router = express.Router();
const treasureController = require('../controllers/TreasureController');
const authenticateJWT = require('../middleware/authMiddleware');


router.post('/', authenticateJWT, treasureController.getNearbyTreasures);

module.exports = router;
