const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH = path.join(__dirname, "data", "transactions.db");

// Database management utilities
class DatabaseManager {
  constructor() {
    this.db = null;
  }

  // Initialize database connection
  async connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Connected to SQLite database");
          resolve(this.db);
        }
      });
    });
  }

  // Get transaction statistics
  async getStats() {
    if (!this.db) await this.connect();

    return new Promise((resolve, reject) => {
      const stats = {};

      // Count total transactions
      this.db.get("SELECT COUNT(*) as total FROM transactions", [], (err, row) => {
        if (err) return reject(err);
        stats.total = row.total;

        // Count by status
        this.db.all("SELECT status, COUNT(*) as count FROM transactions GROUP BY status", [], (err, rows) => {
          if (err) return reject(err);
          stats.byStatus = rows;

          // Count by decision
          this.db.all("SELECT decision, COUNT(*) as count FROM transactions GROUP BY decision", [], (err, rows) => {
            if (err) return reject(err);
            stats.byDecision = rows;

            // Average risk score
            this.db.get("SELECT AVG(score) as avgScore FROM transactions", [], (err, row) => {
              if (err) return reject(err);
              stats.avgScore = row.avgScore || 0;

              resolve(stats);
            });
          });
        });
      });
    });
  }

  // Clean old transactions (keep last N)
  async cleanOldTransactions(keepCount = 1000) {
    if (!this.db) await this.connect();

    return new Promise((resolve, reject) => {
      // Get IDs to delete (keep the most recent N)
      this.db.all(
        "SELECT id FROM transactions ORDER BY timestamp DESC LIMIT -1 OFFSET ?",
        [keepCount],
        (err, rows) => {
          if (err) return reject(err);

          if (rows.length === 0) {
            resolve(0);
            return;
          }

          const idsToDelete = rows.map(row => row.id);
          this.db.run(
            `DELETE FROM transactions WHERE id IN (${idsToDelete.map(() => '?').join(',')})`,
            idsToDelete,
            function(err) {
              if (err) reject(err);
              else resolve(this.changes);
            }
          );
        }
      );
    });
  }

  // Close database connection
  async close() {
    if (this.db) {
      return new Promise((resolve) => {
        this.db.close((err) => {
          if (err) {
            console.error("Error closing database:", err);
          } else {
            console.log("Database connection closed");
          }
          resolve();
        });
      });
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const dbManager = new DatabaseManager();

  try {
    switch (command) {
      case 'stats':
        const stats = await dbManager.getStats();
        console.log("Database Statistics:");
        console.log(`Total transactions: ${stats.total}`);
        console.log(`Average risk score: ${stats.avgScore.toFixed(2)}`);
        console.log("\nTransactions by status:");
        stats.byStatus.forEach(stat => {
          console.log(`  ${stat.status}: ${stat.count}`);
        });
        console.log("\nTransactions by decision:");
        stats.byDecision.forEach(stat => {
          console.log(`  ${stat.decision}: ${stat.count}`);
        });
        break;

      case 'clean':
        const keepCount = parseInt(args[1]) || 1000;
        const deletedCount = await dbManager.cleanOldTransactions(keepCount);
        console.log(`Cleaned ${deletedCount} old transactions, keeping ${keepCount} most recent`);
        break;

      default:
        console.log("Usage:");
        console.log("  node db-manager.js stats    - Show database statistics");
        console.log("  node db-manager.js clean [N] - Clean old transactions, keep N most recent (default: 1000)");
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await dbManager.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = DatabaseManager;