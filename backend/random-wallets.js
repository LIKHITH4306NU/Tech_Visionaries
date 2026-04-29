// Generate random wallet addresses for testing
function generateRandomWallet() {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

function generateRandomWallets(count, riskLevel) {
  const wallets = [];
  const descriptions = {
    safe: [
      "Regular DeFi user",
      "NFT collector",
      "Exchange withdrawal",
      "Staking rewards",
      "Liquidity provider",
      "Token holder",
      "DAO participant",
      "Yield farmer"
    ],
    malicious: [
      "Tornado Cash mixer",
      "Ransomware wallet",
      "Scam token distributor",
      "High-frequency trader",
      "Money launderer",
      "Phishing site wallet",
      "Dark web marketplace",
      "Cryptocurrency thief"
    ],
    suspicious: [
      "Whale wallet spike",
      "Privacy tool user",
      "Unusual transaction pattern",
      "Large holder activity",
      "Mixer participant",
      "Automated trading"
    ]
  };

  for (let i = 0; i < count; i++) {
    const desc = descriptions[riskLevel][Math.floor(Math.random() * descriptions[riskLevel].length)];
    const baseScore = riskLevel === 'safe' ? 10 : riskLevel === 'malicious' ? 70 : 40;
    const score = baseScore + Math.floor(Math.random() * 20);

    wallets.push({
      address: generateRandomWallet(),
      description: desc,
      riskLevel: riskLevel.toUpperCase(),
      expectedScore: score,
      category: riskLevel
    });
  }

  return wallets;
}

// Generate comprehensive test set
const testWallets = {
  safe: generateRandomWallets(10, 'safe'),
  malicious: generateRandomWallets(10, 'malicious'),
  suspicious: generateRandomWallets(5, 'suspicious')
};

// Display results
console.log("🎯 RANDOM TEST WALLETS GENERATED");
console.log("================================\n");

console.log("🟢 SAFE WALLETS (Low Risk):");
testWallets.safe.forEach((wallet, index) => {
  console.log(`${index + 1}. ${wallet.address}`);
  console.log(`   ${wallet.description} - Expected Score: ${wallet.expectedScore}/100`);
});

console.log("\n🔴 MALICIOUS WALLETS (High Risk):");
testWallets.malicious.forEach((wallet, index) => {
  console.log(`${index + 1}. ${wallet.address}`);
  console.log(`   ${wallet.description} - Expected Score: ${wallet.expectedScore}/100`);
});

console.log("\n🟡 SUSPICIOUS WALLETS (Medium Risk):");
testWallets.suspicious.forEach((wallet, index) => {
  console.log(`${index + 1}. ${wallet.address}`);
  console.log(`   ${wallet.description} - Expected Score: ${wallet.expectedScore}/100`);
});

console.log("\n📋 COPY ANY ADDRESS ABOVE TO TEST IN YOUR APP");
console.log("   Safe addresses should show: ✅ SAFE - TRANSACTION ALLOWED");
console.log("   Malicious addresses should show: 🚫 MALICIOUS - THREAT DETECTED");
console.log("   Suspicious addresses should show: ⚠️ SUSPICIOUS - REVIEW REQUIRED");

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = testWallets;
}