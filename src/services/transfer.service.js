// const { Account, Transaction } = require('../models');

// exports.handleTransfer = async ({
//   fromAccountId,
//   toAccountId,
//   amount,
//   type,
//   scheduledAt,
//   recurring
// }) => {
//   const from = await Account.findByPk(fromAccountId);
//   const to = await Account.findByPk(toAccountId);

//   if (!from || !to) throw new Error("Invalid account ID(s)");
//   if (from.balance < amount) throw new Error("Insufficient funds");

//   const fee = type === 'external' ? 1.5 : 0;
//   const totalAmount = amount + fee;

//   if (from.balance < totalAmount) throw new Error("Balance too low after fees");

//   const status = scheduledAt ? 'pending' : 'completed';

//   if (!scheduledAt) {
//     from.balance -= totalAmount;
//     to.balance += amount;
//     await from.save();
//     await to.save();
//   }

//   const transaction = await Transaction.create({
//     fromAccountId,
//     toAccountId,
//     amount,
//     type,
//     fee,
//     status,
//     scheduledAt,
//     recurring
//   });

//   return transaction;
// };

const { Account, Transaction } = require('../models');

exports.handleTransfer = async (data) => {
  const {
    fromAccountId,
    toAccountId,
    amount,
    type,
    scheduledAt,
    recurring
  } = data;

  // 🛡 Check if sender exists
  const fromAccount = await Account.findByPk(fromAccountId);
  if (!fromAccount) throw new Error('Source account not found');

  // 🛡 Check funds before applying fees
  if (fromAccount.balance < amount) {
    throw new Error('Insufficient funds');
  }

  // 🏦 Handle External Transfers
  if (type === 'external') {
    const fee = 0.005 * amount; // 0.5% fee
    const totalAmount = amount + fee;

    if (fromAccount.balance < totalAmount) {
      throw new Error('Insufficient funds for amount + fee');
    }

    fromAccount.balance -= totalAmount;
    await fromAccount.save();

    const transaction = await Transaction.create({
      fromAccountId,
      toAccountId: null, // no recipient account internally
      type,
      amount,
      status: 'completed',
      scheduledAt: null,
      recurring: false,
      fee
    });

    return transaction;
  }

  // 🔁 Handle Internal Transfers (Scheduled or Immediate)
  if (type === 'internal') {
    const toAccount = await Account.findByPk(toAccountId);
    if (!toAccount) throw new Error('Recipient account not found');

    const status = scheduledAt ? 'pending' : 'completed';

    const transaction = await Transaction.create({
      fromAccountId,
      toAccountId,
      type,
      amount,
      status,
      scheduledAt: scheduledAt || null,
      recurring: recurring || false,
      fee: 0
    });

    if (!scheduledAt) {
      fromAccount.balance -= amount;
      toAccount.balance += amount;
      await fromAccount.save();
      await toAccount.save();
    }

    return transaction;
  }

  // ❌ Catch unsupported types
  throw new Error(`Unsupported transfer type: ${type}`);
};
