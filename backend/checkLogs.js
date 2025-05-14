const { ethers } = require('ethers');

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your contract address
const contractABI = [
  {
    "type": "function",
    "name": "getAlertCount",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAlert",
    "inputs": [{"name": "index", "type": "uint256", "internalType": "uint256"}],
    "outputs": [
      {"name": "", "type": "string", "internalType": "string"},
      {"name": "", "type": "uint256", "internalType": "uint256"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "AlertReceived",
    "inputs": [
      {"name": "transcription", "type": "string", "indexed": false, "internalType": "string"},
      {"name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256"}
    ],
    "anonymous": false
  }
];

// Connect to local Ethereum node (e.g., Ganache or Hardhat Network)
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545'); // Change this if needed

const contract = new ethers.Contract(contractAddress, contractABI, provider);

async function fetchAlerts() {
  try {
    const alertCount = await contract.getAlertCount();
    console.log(`Total alerts: ${alertCount.toString()}`);

    for (let i = 0; i < alertCount; i++) {  // Convert BigNumber to number for iteration
        const alert = await contract.getAlert(i);
        console.log(alert);
    }
  } catch (error) {
    console.error('Error fetching alerts:', error);
  }
}

fetchAlerts();


// const timestamp = 1745344290n; // Example BigInt
// const normalTime = new Date(Number(timestamp) * 1000).toLocaleString(); 
// console.log(normalTime);  // This will give you the date in a human-readable format.
