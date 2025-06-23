const authenticateToken = require('../middlewares/auth');


const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');

// GET /api/transactions
router.get('/', authenticateToken, historyController.getTransactionHistory);

module.exports = router;
