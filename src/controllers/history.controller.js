// 

const historyService = require('../services/history.service');
const { Parser } = require('json2csv');

exports.getTransactionHistory = async (req, res) => {
  try {
    const { export: exportFormat, ...filters } = req.query;

    const result = await historyService.fetchTransactions(filters);

    // ✅ Export as CSV
    if (exportFormat === 'csv') {
      const parser = new Parser();
      const plainData = result.transactions.map(tx => tx.toJSON());
      const csv = parser.parse(plainData);

      res.header('Content-Type', 'text/csv');
      res.attachment('transactions.csv');
      return res.send(csv);
    }

    // ✅ Export as JSON (optional)
    if (exportFormat === 'json') {
      return res.json(result.transactions);
    }

    // ✅ Default: paginated response
    res.status(200).json(result);
  } catch (error) {
    console.error("🔥 CSV Export Error:", error);
    res.status(400).json({ error: error.message });
  }
};
