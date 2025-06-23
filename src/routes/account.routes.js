const authenticateToken = require('../middlewares/auth');

const express = require('express');
const router = express.Router();
const { createAccount } = require('../controllers/account.controller');

router.post('/', authenticateToken, createAccount); // ✅ Account creation

module.exports = router;
