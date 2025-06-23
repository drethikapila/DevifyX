const balanceService = require('../services/balance.service');

exports.getBalance = async (req, res) => {
  try {
    const accountId = req.params.id;
    const balances = await balanceService.fetchBalance(accountId);
    res.status(200).json(balances);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
