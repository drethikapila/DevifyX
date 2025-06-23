const authenticateToken = require('../middlewares/auth');

const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transfer.controller');
const { validateTransfer } = require('../validations/transfer.validation');



router.post('/', authenticateToken, validateTransfer, transferController.createTransfer);

module.exports = router;