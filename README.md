# **1. Project Overview**

The **AI Crypto Defense & Threat Containment System** is a web-based application designed to analyze blockchain wallet addresses and detect potential threats such as:

* Fraudulent wallets
* Suspicious transaction patterns
* Malicious or ransomware-linked addresses

The system assigns a **risk score (0–100)** and classifies wallets into three categories:

* Safe
* Suspicious
* Malicious

Based on this classification, the system performs automated actions such as:

* Allowing transactions
* Delaying transactions for verification
* Blocking and blacklisting wallets

The primary objective is to simulate an **AI-powered cybersecurity layer for blockchain transactions**.

---

# **2. Tech Stack**

## **Frontend**

* HTML, CSS, JavaScript
* Features:

  * Risk gauge visualization
  * Real-time logs
  * Dynamic threat indicators

---

## **Backend**

* Node.js
* Express.js
* CORS (Cross-Origin Resource Sharing)

---

## **Optional AI Layer (Advanced Version)**

* Claude AI API
* Used for intelligent wallet analysis with structured JSON responses

---

## **Storage**

* In-memory storage:

  * Blacklist (Set/Array)
  * System statistics (analyzed, blocked)

---

# **3. Method of Implementation**

---

## **Step 1: User Input**

The user provides:

* Wallet address
* Blockchain network (Ethereum, Bitcoin, etc.)
* Transaction amount
* Receiver address

---

## **Step 2: API Request**

The frontend sends an HTTP request to the backend:

```http
POST /analyze
```

---

## **Step 3: Analysis Engine**

### **Simplified Version**

* Uses rule-based logic
* Generates risk score based on:

  * Address pattern
  * Heuristic or pseudo-random calculations

### **Advanced Version**

* AI model evaluates:

  * Transaction behavior
  * Risk patterns
  * Network anomalies

---

## **Step 4: Risk Classification**

| Score Range | Status     | Decision |
| ----------- | ---------- | -------- |
| 0–39        | Safe       | Allow    |
| 40–69       | Suspicious | Delay    |
| 70–100      | Malicious  | Block    |

---

## **Step 5: Response Generation**

The backend returns a structured JSON response:

```json
{
  "score": 78,
  "status": "malicious",
  "decision": "block"
}
```

---

## **Step 6: User Interface Visualization**

The frontend dynamically updates:

* Risk gauge meter
* Status badge
* Feature anomaly indicators
* Explanation of detected threats
* Incident logs

---

## **Step 7: Threat Containment**

If a wallet is classified as malicious:

* It is added to the blacklist
* Future transactions from the same wallet are automatically blocked

---

# **4. System Workflow**

```text
User Input → Backend API → Analysis Engine → Risk Score → Decision → UI Update → Blacklist (if required)
```

---

# **5. Key Features**

* Real-time wallet risk analysis
* Rule-based or AI-driven decision-making
* Automatic threat detection and blocking
* Interactive risk visualization dashboard
* Blacklist management system
* Incident logging and monitoring

---

# **6. Applications**

* Cryptocurrency exchanges
* Fraud detection systems
* Blockchain monitoring tools
* Cybersecurity platforms

---

# **7. Conclusion**

This project demonstrates how artificial intelligence and blockchain security can be integrated to:

* Detect threats proactively
* Automate decision-making processes
* Enhance transaction safety

It serves as a prototype for developing intelligent financial security systems in decentralized environments.

---