// const app = require('./src/app');
// const dotenv = require('dotenv');
// dotenv.config();

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // 🕒 Step 2: Import the scheduler and run it every 1 minute
// const { processScheduledTransfers } = require('./src/utils/scheduler');

// setInterval(() => {
//   console.log("⏳ Running scheduled transfer check...");
//   processScheduledTransfers();
// }, 60 * 1000); // every 60 seconds

// server.js


// server.js
require('dotenv').config(); // ✅ Load .env first

const app = require('./src/app');
const { processScheduledTransfers } = require('./src/utils/scheduler');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ⏰ Run scheduled transfer processing every minute
setInterval(() => {
  console.log("⏳ Running scheduled transfer check...");
  processScheduledTransfers();
}, 60 * 1000);
