// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // Middleware to parse incoming JSON data
// app.use(bodyParser.json());

// // Endpoint to receive distress alerts
// app.post('/api/alerts', (req, res) => {
//     const { keywords_detected } = req.body;  // Get the keywords_detected from the request body

//     if (keywords_detected && Array.isArray(keywords_detected)) {
//         console.log("🚨 Distress Keywords Detected:", keywords_detected);
//     } else {
//         console.log("❌ No valid keywords received.");
//     }

//     res.status(200).send({ message: "Alert received successfully" });  // Send response back to the Python script
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`🚀 Express server running on http://localhost:${port}`);
// });

// const express = require('express');
// const app = express();

// // Middleware to parse incoming JSON requests
// app.use(express.json()); // This line is crucial to parse the body of POST requests as JSON

// // Route to receive the distress alerts
// app.post('/api/alerts', (req, res) => {
//     const { transcription } = req.body;  // Extract transcription from the request body

//     if (transcription && transcription.length > 0) {
//         console.log("Received distress alert:", transcription);  // Log the transcription
//         res.send("Alert received and logged");  // Send a response back to the client
//     } else {
//         console.log("❌ No valid keywords received.");  // Log error if no valid transcription
//         res.status(400).send("Invalid alert data");  // Respond with an error
//     }
// });

// // Start the server on port 3000
// app.listen(3000, () => {
//     console.log("🚀 Express server running on http://localhost:3000");
// });



// const dotenv = require('dotenv');
// dotenv.config(); // Load environment variables from .env file

// const express = require('express');
// const { ethers } = require('ethers'); // Ethers.js to interact with Ethereum
// const app = express();

// // Middleware to parse incoming JSON requests
// app.use(express.json()); // This line is crucial to parse the body of POST requests as JSON

// // Ethereum provider and contract setup
// const provider = new ethers.JsonRpcProvider(process.env.BACK_RPC_URL); // Replace with your Ethereum node provider URL

// const privateKey = process.env.BACK_PRIVATE_KEY;
// const signer = new ethers.Wallet(privateKey, provider); // Replace with your private key
// const contractAddress = '0xa5AB387AB975EF1FFF6F1E5Bb0f757952F3c83Ec'; // Deployed contract address sepolia
// // const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Deployed contract address anvil
// const contractABI = [
//     {"type":"function","name":"alerts","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"transcription","type":"string","internalType":"string"},{"name":"timestamp","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getAlert","inputs":[{"name":"index","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getAlertCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"storeAlert","inputs":[{"name":"_transcription","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"AlertReceived","inputs":[{"name":"transcription","type":"string","indexed":false,"internalType":"string"},{"name":"timestamp","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false}
// ]; // Contract ABI (simplified version)

// const contract = new ethers.Contract(contractAddress, contractABI, signer);

// // Route to receive distress alerts
// app.post('/api/alerts', async (req, res) => {
//     const { transcription } = req.body;  // Extract transcription from the request body

//     if (transcription && transcription.length > 0) {
//         console.log("Received distress alert:", transcription);  // Log the transcription

//         // Send the alert to the blockchain
//         try {
//             const tx = await contract.storeAlert(transcription);
//             await tx.wait();  // Wait for the transaction to be mined

//             console.log("Alert successfully stored on blockchain:", transcription);
//             res.send("Alert received and stored on blockchain");  // Send a response back to the client
//         } catch (error) {
//             console.error("Error storing alert on blockchain:", error);
//             res.status(500).send("Failed to store alert on blockchain");  // Respond with an error
//         }
//     } else {
//         console.log("❌ No valid keywords received.");  // Log error if no valid transcription
//         res.status(400).send("Invalid alert data");  // Respond with an error
//     }
// });

// // Start the server on port 3000
// app.listen(3000, () => {
//     console.log("🚀 Express server running on http://localhost:3000");
// });





const dotenv = require('dotenv');
dotenv.config()

const express = require('express');
const axios = require('axios');
const { ethers } = require('ethers');

const app = express();

const CHANNEL_ID = '2944842';
const READ_API_KEY = 'DXEBBCN3MA2IK7NZ';

let lastEntryId = null;

// Replace these with your actual values:
const CONTRACT_ADDRESS = '0xa5AB387AB975EF1FFF6F1E5Bb0f757952F3c83Ec';
const CONTRACT_ABI = [ 
    {"type":"function","name":"alerts","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"transcription","type":"string","internalType":"string"},{"name":"timestamp","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getAlert","inputs":[{"name":"index","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getAlertCount","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"storeAlert","inputs":[{"name":"_transcription","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"AlertReceived","inputs":[{"name":"transcription","type":"string","indexed":false,"internalType":"string"},{"name":"timestamp","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false}
];
// const PRIVATE_KEY = '26434037823961c2cbd288787d8942f0bd424f1c62045b34f9540b5a53c14be4';
// const RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/Ldp0rk-l1YIuY02pjUx7oZSy6JuB8qxw'; // or Anvil, Hardhat, etc.

// Setup Ethers provider and signer
// const provider = new ethers.JsonRpcProvider(RPC_URL);
const privateKey = process.env.BACK_PRIVATE_KEY
const provider = new ethers.JsonRpcProvider(process.env.BACK_RPC_URL);
// const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

const pollThingSpeak = async () => {
  try {
    const response = await axios.get(`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json`, {
      params: {
        api_key: READ_API_KEY,
        results: 1
      }
    });

    const latest = response.data.feeds[0];

    if (latest && latest.entry_id !== lastEntryId) {
      const alert = latest.field1;

      console.log(`\nNew data received at ${latest.created_at}:`);
      Object.entries(latest).forEach(([key, value]) => {
        if (key.startsWith('field')) {
          console.log(`${key}: ${value}`);
        }
      });

      console.log(`Main Msg: ${alert}`);
      lastEntryId = latest.entry_id;

      // 👉 Send to blockchain
      await storeAlertOnBlockchain(alert);
    }
  } catch (error) {
    console.error("Error polling ThingSpeak:", error.message);
  }
};

const storeAlertOnBlockchain = async (alert) => {
  try {
    const tx = await contract.storeAlert(alert); // change method name based on your smart contract
    console.log(`🔗 Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log(`✅ Stored on blockchain`);
  } catch (err) {
    console.error("❌ Error storing on blockchain:", err.message);
  }
};

setInterval(pollThingSpeak, 10000);

app.listen(3000, () => {
  console.log('Express app running on port 3000');
});
