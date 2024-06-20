const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, resultController.submitResult);
router.get('/', authenticateToken, resultController.getRanking);

module.exports = router;
