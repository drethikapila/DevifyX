const authenticateToken = require('../middlewares/auth');

const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balance.controller');

// Route: GET /api/accounts/:id/balance
router.get('/:id/balance',authenticateToken, balanceController.getBalance);

module.exports = router;

