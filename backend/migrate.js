const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "data", "transactions.db");
const JSON_FILE = path.join(__dirname, "data", "transactions.json");

async function migrateData() {
  console.log("Starting data migration from JSON to SQLite...");

  // Read existing JSON data
  let jsonData = [];
  try {
    const data = fs.readFileSync(JSON_FILE, "utf8");
    jsonData = JSON.parse(data || "[]");
    console.log(`Found ${jsonData.length} transactions in JSON file`);
  } catch (error) {
    console.log("No existing JSON data found or error reading file:", error.message);
    return;
  }

  if (jsonData.length === 0) {
    console.log("No data to migrate");
    return;
  }

  // Initialize database
  const db = new sqlite3.Database(DB_PATH);

  // Create table if it doesn't exist
  await new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        walletAddr TEXT NOT NULL,
        receiverAddr TEXT NOT NULL,
        amount REAL NOT NULL,
        currency TEXT NOT NULL,
        network TEXT NOT NULL,
        score INTEGER NOT NULL,
        status TEXT NOT NULL,
        decision TEXT NOT NULL,
        reasons TEXT
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Check if data already exists in database
  const existingCount = await new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) as count FROM transactions", [], (err, row) => {
      if (err) reject(err);
      else resolve(row.count);
    });
  });

  if (existingCount > 0) {
    console.log(`Database already contains ${existingCount} transactions. Skipping migration.`);
    db.close();
    return;
  }

  // Insert data
  console.log("Migrating data to SQLite database...");

  for (const transaction of jsonData) {
    await new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO transactions (timestamp, walletAddr, receiverAddr, amount, currency, network, score, status, decision, reasons)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        transaction.timestamp,
        transaction.walletAddr,
        transaction.receiverAddr,
        transaction.amount,
        transaction.currency,
        transaction.network,
        transaction.score,
        transaction.status,
        transaction.decision,
        JSON.stringify(transaction.reasons || []),
      ];

      db.run(sql, values, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  console.log(`Successfully migrated ${jsonData.length} transactions to SQLite database`);

  // Backup the old JSON file
  const backupPath = path.join(__dirname, "data", "transactions.json.backup");
  fs.renameSync(JSON_FILE, backupPath);
  console.log("Original JSON file backed up as transactions.json.backup");

  db.close();
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateData().catch(console.error);
}

module.exports = { migrateData };