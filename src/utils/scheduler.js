// const { Transaction, Account } = require('../models');
// const { Op } = require('sequelize');

// async function processScheduledTransfers() {
//   try {
//     console.log("⏳ Running scheduled transfer check...");
//     const now = new Date();

//     const transfers = await Transaction.findAll({
//       where: {
//         status: 'pending',
//         scheduledAt: { [Op.lte]: now }
//       }
//     });

//     if (transfers.length === 0) {
//       console.log("ℹ️  No pending transfers to process.");
//     }

//     for (const tx of transfers) {
//       console.log(`🔍 Found transfer #${tx.id}`);

//       const fromAccount = await Account.findByPk(tx.fromAccountId);
//       const toAccount = await Account.findByPk(tx.toAccountId);

//       if (!fromAccount || !toAccount) {
//         console.log(`❌ Transfer #${tx.id} failed: Invalid accounts`);
//         continue;
//       }

//       if (fromAccount.balance < tx.amount) {
//         console.log(`❌ Transfer #${tx.id} failed: Insufficient funds`);
//         continue;
//       }

//       // Perform the transfer
//       fromAccount.balance -= tx.amount;
//       toAccount.balance += tx.amount;

//       await fromAccount.save();
//       await toAccount.save();

//       tx.status = 'completed';
//       tx.updatedAt = new Date();
//       await tx.save();

//       console.log(`✅ Scheduled transfer #${tx.id} processed.`);
//     }
//   } catch (error) {
//     console.error("❌ Error during scheduled transfer check:", error);
//   }
// }

// module.exports = { processScheduledTransfers };


const { Transaction, Account } = require('../models');
const { Op } = require('sequelize');

async function processScheduledTransfers() {
  try {
    console.log("⏳ Running scheduled transfer check...");
    const now = new Date();

    const transfers = await Transaction.findAll({
      where: {
        status: 'pending',
        scheduledAt: { [Op.lte]: now }
      }
    });

    if (transfers.length === 0) {
      console.log("ℹ️  No pending transfers to process.");
    }

    for (const tx of transfers) {
      console.log(`🔍 Found transfer #${tx.id}`);

      const fromAccount = await Account.findByPk(tx.fromAccountId);
      const toAccount = await Account.findByPk(tx.toAccountId);

      if (!fromAccount || !toAccount) {
        console.log(`❌ Transfer #${tx.id} failed: Invalid accounts`);
        continue;
      }

      if (fromAccount.balance < tx.amount) {
        console.log(`❌ Transfer #${tx.id} failed: Insufficient funds`);
        continue;
      }

      // ✅ Perform the transfer
      fromAccount.balance -= tx.amount;
      toAccount.balance += tx.amount;

      await fromAccount.save();
      await toAccount.save();

      // ✅ Mark current transaction as completed
      tx.status = 'completed';
      tx.updatedAt = new Date();
      await tx.save();

      console.log(`✅ Scheduled transfer #${tx.id} processed.`);

      // 🔁 Recurring logic: create next instance
      if (tx.recurring) {
        const nextScheduledAt = new Date(tx.scheduledAt);
        nextScheduledAt.setDate(nextScheduledAt.getDate() + 7); // Example: weekly

        await Transaction.create({
          fromAccountId: tx.fromAccountId,
          toAccountId: tx.toAccountId,
          type: tx.type,
          amount: tx.amount,
          status: 'pending',
          scheduledAt: nextScheduledAt,
          recurring: true,
          fee: tx.fee
        });

        console.log(`🔁 Recurring transfer scheduled for ${nextScheduledAt}`);
      }
    }
  } catch (error) {
    console.error("❌ Error during scheduled transfer check:", error);
  }
}

module.exports = { processScheduledTransfers };
