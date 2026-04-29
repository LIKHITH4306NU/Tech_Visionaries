const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH = path.join(__dirname, "data", "transactions.db");

function viewDatabaseEntries() {
  const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
      return;
    }
  });

  console.log("🔍 AI Crypto Defense Database Entries");
  console.log("=====================================\n");

  db.all("SELECT * FROM transactions ORDER BY timestamp DESC", [], (err, rows) => {
    if (err) {
      console.error("Error reading database:", err.message);
      return;
    }

    if (rows.length === 0) {
      console.log("No transactions found in database.");
      db.close();
      return;
    }

    console.log(`Total transactions: ${rows.length}\n`);

    rows.forEach((row, index) => {
      console.log(`📋 Transaction #${row.id}`);
      console.log(`   Timestamp: ${new Date(row.timestamp).toLocaleString()}`);
      console.log(`   Wallet: ${row.walletAddr}`);
      console.log(`   Receiver: ${row.receiverAddr}`);
      console.log(`   Amount: ${row.amount} ${row.currency}`);
      console.log(`   Network: ${row.network}`);
      console.log(`   Risk Score: ${row.score}/100`);
      console.log(`   Status: ${row.status.toUpperCase()}`);
      console.log(`   Decision: ${row.decision.toUpperCase()}`);

      // Parse and display reasons
      if (row.reasons) {
        const reasons = JSON.parse(row.reasons);
        console.log(`   Analysis Reasons:`);
        reasons.forEach((reason, idx) => {
          const icon = reason.type === 'safe' ? '✅' : reason.type === 'warning' ? '⚠️' : '🚫';
          console.log(`     ${icon} ${reason.text}`);
        });
      }

      console.log("   " + "─".repeat(50));
    });

    db.close();
  });
}

// Run if called directly
if (require.main === module) {
  viewDatabaseEntries();
}

module.exports = { viewDatabaseEntries };