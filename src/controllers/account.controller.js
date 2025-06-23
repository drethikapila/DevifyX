const { Account } = require('../models');

exports.createAccount = async (req, res) => {
  try {
    const { type, initialBalance, currency } = req.body;
    const userId = req.user.userId; // assuming authenticated token gives user info
    
    console.log("Request body:", req.body); // 👈 Log input
    console.log("User ID from token:", userId); // 👈 Check if userId is coming in

    if (!type || !currency) {
      return res.status(400).json({ error: "Account type and currency are required" });
    }

    const account = await Account.create({
      userId,
      type,
      balance: initialBalance || 0,
      currency
    });

    res.status(201).json({ message: 'Account created', account });
  } catch (error) {
    console.error("🔥 Account creation error:", error);
    res.status(500).json({ error: 'Account creation failed' });
  }
};
