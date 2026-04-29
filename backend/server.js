const fs = require("fs").promises;
const os = require("os");
const path = require("path");
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "data", "transactions.db");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Initialize database
function initDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        reject(err);
      } else {
        // Create transactions table if it doesn't exist
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
          if (err) {
            reject(err);
          } else {
            resolve(db);
          }
        });
      }
    });
  });
}

// Database instance
let db;

async function initializeApp() {
  try {
    db = await initDatabase();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

app.get("/api/transactions", (req, res) => {
  db.all("SELECT * FROM transactions ORDER BY timestamp DESC", [], (err, rows) => {
    if (err) {
      console.error("Error reading transactions:", err);
      return res.status(500).json({ message: "Failed to read transaction history." });
    }

    // Parse reasons JSON string back to array
    const transactions = rows.map(row => ({
      ...row,
      reasons: row.reasons ? JSON.parse(row.reasons) : []
    }));

    res.json(transactions);
  });
});

app.post("/api/transactions", (req, res) => {
  const payload = req.body;
  const required = ["walletAddr", "receiverAddr", "amount", "currency", "network", "score", "status", "decision"];

  for (const field of required) {
    if (!payload[field] && payload[field] !== 0) {
      return res.status(400).json({ message: `Missing field: ${field}` });
    }
  }

  const newRecord = {
    timestamp: new Date().toISOString(),
    walletAddr: payload.walletAddr,
    receiverAddr: payload.receiverAddr,
    amount: payload.amount,
    currency: payload.currency,
    network: payload.network,
    score: payload.score,
    status: payload.status,
    decision: payload.decision,
    reasons: JSON.stringify(payload.reasons || []),
  };

  const sql = `
    INSERT INTO transactions (timestamp, walletAddr, receiverAddr, amount, currency, network, score, status, decision, reasons)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    newRecord.timestamp,
    newRecord.walletAddr,
    newRecord.receiverAddr,
    newRecord.amount,
    newRecord.currency,
    newRecord.network,
    newRecord.score,
    newRecord.status,
    newRecord.decision,
    newRecord.reasons,
  ];

  db.run(sql, values, function(err) {
    if (err) {
      console.error("Error saving transaction:", err);
      return res.status(500).json({ message: "Unable to save transaction." });
    }

    // Return the created record with the auto-generated ID
    const createdRecord = {
      id: this.lastID,
      ...newRecord,
      reasons: payload.reasons || []
    };

    res.status(201).json(createdRecord);
  });
});

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed.');
      }
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

const HOST = '0.0.0.0';

// Initialize database and start server
initializeApp().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Database: ${DB_PATH}`);
    const localIp = getLocalIp();
    if (localIp) {
      console.log(`Access from other devices: http://${localIp}:${PORT}`);
    }
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
