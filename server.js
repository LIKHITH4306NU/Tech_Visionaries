const fs = require("fs").promises;
const os = require("os");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "transactions.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch (err) {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function readTransactions() {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(data || "[]");
}

async function writeTransactions(transactions) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(transactions, null, 2), "utf8");
}

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await readTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to read transaction history." });
  }
});

app.post("/api/transactions", async (req, res) => {
  const payload = req.body;
  const required = ["walletAddr", "receiverAddr", "amount", "currency", "network", "score", "status", "decision"];
  for (const field of required) {
    if (!payload[field] && payload[field] !== 0) {
      return res.status(400).json({ message: `Missing field: ${field}` });
    }
  }

  try {
    const transactions = await readTransactions();
    const newRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      walletAddr: payload.walletAddr,
      receiverAddr: payload.receiverAddr,
      amount: payload.amount,
      currency: payload.currency,
      network: payload.network,
      score: payload.score,
      status: payload.status,
      decision: payload.decision,
      reasons: payload.reasons || [],
    };
    transactions.unshift(newRecord);
    await writeTransactions(transactions);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: "Unable to save transaction." });
  }
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

const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  const localIp = getLocalIp();
  if (localIp) {
    console.log(`Access from other devices: http://${localIp}:${PORT}`);
  }
});
