const { Account, Transaction } = require('../models');

exports.fetchBalance = async (accountId) => {
  const account = await Account.findByPk(accountId);

  if (!account) {
    throw new Error("Account not found");
  }

  // Available balance = actual balance
  const availableBalance = account.balance;

  // Ledger balance = balance - pending outgoing transfers
  const pendingOutgoing = await Transaction.sum('amount', {
    where: {
      fromAccountId: accountId,
      status: 'pending'
    }
  }) || 0;

  const ledgerBalance = availableBalance - pendingOutgoing;

  return {
    accountId: account.id,
    currency: account.currency,
    availableBalance,
    ledgerBalance
  };
};
