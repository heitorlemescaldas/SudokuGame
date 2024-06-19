const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/new', authenticateToken, gameController.newGame);

module.exports = router;
