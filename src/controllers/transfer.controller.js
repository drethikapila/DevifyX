const transferService = require('../services/transfer.service');

exports.createTransfer = async (req, res) => {
  try {

    const transfer = await transferService.handleTransfer(req.body);
    res.status(201).json({
      message: 'Transfer initiated',
      transfer
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
