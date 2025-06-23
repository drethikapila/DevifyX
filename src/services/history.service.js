// const { Transaction } = require('../models');
// const { Op } = require('sequelize');

// exports.fetchTransactions = async ({ accountId, type, status, startDate, endDate, limit = 10, offset = 0 }) => {
//   const whereClause = {};

//   // Show all transactions involving the given account
//   if (accountId) {
//     whereClause[Op.or] = [
//       { fromAccountId: accountId },
//       { toAccountId: accountId }
//     ];
//   }

//   if (type) whereClause.type = type;
//   if (status) whereClause.status = status;

//   if (startDate || endDate) {
//     whereClause.createdAt = {};
//     if (startDate) whereClause.createdAt[Op.gte] = new Date(startDate);
//     if (endDate) whereClause.createdAt[Op.lte] = new Date(endDate);
//   }

//   const { count, rows } = await Transaction.findAndCountAll({
//     where: whereClause,
//     order: [['createdAt', 'DESC']],
//     limit: parseInt(limit),
//     offset: parseInt(offset)
//   });

//   return {
//     total: count,
//     transactions: rows
//   };
// };
const { Transaction } = require('../models');
const { Op } = require('sequelize');

exports.fetchTransactions = async ({
  accountId,
  type,
  status,
  startDate,
  endDate,
  page = 1,
  limit = 10
}) => {
  const whereClause = {};

  // ✅ Filter: Account involved (sender or receiver)
  if (accountId) {
    whereClause[Op.or] = [
      { fromAccountId: accountId },
      { toAccountId: accountId }
    ];
  }

  // ✅ Filter: Transaction type
  if (type) whereClause.type = type;

  // ✅ Filter: Transaction status
  if (status) whereClause.status = status;

  // ✅ Filter: Date range
  if (startDate || endDate) {
    whereClause.createdAt = {};
    if (startDate) whereClause.createdAt[Op.gte] = new Date(startDate);
    if (endDate) whereClause.createdAt[Op.lte] = new Date(endDate);
  }

  // 🧮 Pagination setup
  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const offset = (parsedPage - 1) * parsedLimit;

  const { count, rows } = await Transaction.findAndCountAll({
    where: whereClause,
    order: [['createdAt', 'DESC']],
    limit: parsedLimit,
    offset
  });

  return {
    total: count,
    page: parsedPage,
    totalPages: Math.ceil(count / parsedLimit),
    transactions: rows
  };
};
