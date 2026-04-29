// Sample wallet addresses for testing AI Crypto Defense System
// These are fictional addresses for demonstration purposes only

const SAMPLE_WALLETS = {
  // LOW RISK (SAFE) WALLETS
  safe: {
    defiUser: {
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      description: "Regular DeFi user - Uniswap liquidity provider",
      riskLevel: "LOW",
      expectedScore: 15,
      reasons: ["Normal transaction frequency", "Legitimate DeFi interactions", "No flagged connections"]
    },
    exchangeWallet: {
      address: "0x8ba1f109551bD432803012645261768497dAE819",
      description: "Exchange withdrawal wallet",
      riskLevel: "LOW",
      expectedScore: 12,
      reasons: ["Standard exchange patterns", "Clean transaction history", "Verified source"]
    },
    nftCollector: {
      address: "0x9f4c5d6e8b7a3f2e1d0c9b8a7f6e5d4c3b2a1",
      description: "NFT collector on OpenSea",
      riskLevel: "LOW",
      expectedScore: 18,
      reasons: ["NFT marketplace activity", "Consistent small transactions", "No suspicious patterns"]
    }
  },

  // HIGH RISK (MALICIOUS) WALLETS
  malicious: {
    tornadoCash: {
      address: "0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc",
      description: "Tornado Cash mixer participant",
      riskLevel: "HIGH",
      expectedScore: 85,
      reasons: ["Tornado Cash interaction", "Privacy mixer usage", "High anonymity risk"]
    },
    ransomware: {
      address: "0x6b175474e89094c44Da98b954EedeAC495271d0F",
      description: "Ransomware payment wallet",
      riskLevel: "HIGH",
      expectedScore: 92,
      reasons: ["Ransomware cluster association", "Large suspicious transfers", "Blacklisted connections"]
    },
    scamWallet: {
      address: "0xF4B2A3C1D9E8F7A6B5C4D3E2F1A9B8C7D6E5F4",
      description: "Fake airdrop scam wallet",
      riskLevel: "HIGH",
      expectedScore: 88,
      reasons: ["Scam token distribution", "Fake giveaway patterns", "Reported fraud activity"]
    },
    highFreqTrader: {
      address: "0xA1B2C3D4E5F678901234567890123456789012",
      description: "High-frequency trading bot",
      riskLevel: "HIGH",
      expectedScore: 78,
      reasons: ["Abnormal transaction frequency", "Automated trading patterns", "Market manipulation indicators"]
    }
  },

  // MEDIUM RISK WALLETS
  suspicious: {
    whaleWallet: {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      description: "Large holder with sudden activity spike",
      riskLevel: "MEDIUM",
      expectedScore: 45,
      reasons: ["Recent activity spike", "Large holdings", "Unusual transaction patterns"]
    },
    mixerUser: {
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      description: "Privacy tool user",
      riskLevel: "MEDIUM",
      expectedScore: 52,
      reasons: ["Privacy protocol usage", "Mixed transaction sources", "Anonymity concerns"]
    }
  }
};

// Export for use in testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SAMPLE_WALLETS;
}

console.log("Sample wallet addresses loaded for testing:");
console.log("Safe wallets:", Object.keys(SAMPLE_WALLETS.safe).length);
console.log("Malicious wallets:", Object.keys(SAMPLE_WALLETS.malicious).length);
console.log("Suspicious wallets:", Object.keys(SAMPLE_WALLETS.suspicious).length);