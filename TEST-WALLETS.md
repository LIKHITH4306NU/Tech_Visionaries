# Random Test Wallet Addresses
# Generated for AI Crypto Defense System Testing

## 🟢 SAFE WALLETS (Low Risk - Should Pass)
0x96c52932867facd21d32986bbc699fb6adbed5f4  # DAO participant
0x3a7a54d65f544ec71b88ba5fac157128f723469d  # Yield farmer
0x52d05c6b7b004bdb5d039108217756ceb2184b53  # DAO participant
0x97a600ce9966f3d43fa1e37a403519955d900c98  # Exchange withdrawal
0x3d0f91cb67e99d8d951bdbaa3e81b470e484291a  # Token holder

## 🔴 MALICIOUS WALLETS (High Risk - Should Block)
0x16084cd1cfcb90adca960762a70409623f17413f  # Tornado Cash mixer
0xe628190263a1c8e7a01e53f7fc0b94ba03b7d6c0  # High-frequency trader
0xaae579092d78e814eef29e15a9eb19ebf1cee064  # Money launderer
0x3e3c3889900abb7c14fdaf0e822a7c16d2bb891b  # High-frequency trader
0xcdc46c79aec03f08c695edc57cd6716e3c1ac43d  # Phishing site wallet

## 🟡 SUSPICIOUS WALLETS (Medium Risk - Should Flag)
0xb8239c117b842e0e4c19c8585510edc76c80d6e5  # Unusual transaction pattern
0xa56b7022bd1263bb1e8d9c40754784d048ffce0e  # Unusual transaction pattern
0x3aa947074139912ea3209ded759b5d334ff250e9  # Large holder activity

## How to Test
1. Start your app: cd backend && npm start
2. Open: http://localhost:3000
3. Copy/paste any address above into the wallet field
4. Click "ANALYZE & SCAN"
5. Verify the risk assessment matches expected results

## Expected Results
- Safe: Green checkmarks, "TRANSACTION ALLOWED"
- Malicious: Red alerts, "THREAT DETECTED"
- Suspicious: Yellow warnings, potential review