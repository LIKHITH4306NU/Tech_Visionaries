# Tech Visionaries

This repository now includes a full frontend and backend setup for the AI Crypto Defense system.

## Project Structure

- `frontend/` - Contains the HTML, CSS, and JavaScript for the client-side application
- `backend/` - Contains the Node.js server, API, and data storage
- `README.md` - This documentation file
- `.gitignore` - Git ignore rules

## Run locally

1. Install backend dependencies:

   cd backend
   npm install

2. Start the backend and frontend server:

   npm start

3. Open your browser and visit:

   http://localhost:3000

## Mobile access

If you want to open the app from a smartphone on the same Wi-Fi network, use your computer's local IP address instead of `localhost`. For example:

`http://192.168.1.100:3000`

Do not use `localhost` on the phone because that resolves to the phone itself.

## Features

- Frontend UI served from `frontend/index.html`
- Backend API serving `/api/transactions`
- Transaction history persisted in `backend/data/transactions.json`
- Frontend saves each analyzed transaction to the backend and loads stored history

---

## Mobile access

If you want to open the app from a smartphone on the same Wi-Fi network, use your computer’s local IP address instead of `localhost`. For example:

`http://192.168.1.100:3000`

Do not use `localhost` on the phone because that resolves to the phone itself.


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