import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Wallet from './wallet'; 
import Alert from './Alert';

// Your contract's ABI and address
const contractAddress = "0xa5AB387AB975EF1FFF6F1E5Bb0f757952F3c83Ec"; // Make sure this is your deployed contract address
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

function App() {
  // const [alerts, setAlerts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [alertCount, setAlertCount] = useState(0);
  // useEffect(() => {
  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   let contract;
  
  //   const fetchInitialAlerts = async () => {
  //     const signer = await provider.getSigner();
  //     contract = new ethers.Contract(contractAddress, contractABI, signer);
  
  //     try {
  //       const count = await contract.getAlertCount();
  //       setAlertCount(Number(count));
  //       const alertsArray = [];
  
  //       for (let i = 0; i < count; i++) {
  //         const [transcription, timestamp] = await contract.getAlert(i);
  //         alertsArray.push({
  //           transcription,
  //           timestamp
  //         });
          
  //       }
  
  //       setAlerts(alertsArray);
  //     } catch (error) {
  //       console.error("Error fetching alerts:", error);
  //     }
  //     setLoading(false);
  //   };
  
  //   const setupEventListener = async () => {
  //     const signer = await provider.getSigner();
  //     contract = new ethers.Contract(contractAddress, contractABI, signer);

  //     contract.on("AlertReceived", (transcription, timestamp) => {
  //       setAlerts((prevAlerts) => [
  //         { transcription, timestamp },
  //         ...prevAlerts, // this keeps previous alerts below
  //       ]);
  //       setAlertCount(prev => prev + 1);
  //       console.log("New Alert Received:", transcription, timestamp);
  //       const normalTime = new Date(Number(timestamp) * 1000).toLocaleString(); 
  //       console.log(normalTime);
  //     });
      
  //   };
  
  //   fetchInitialAlerts();
  //   setupEventListener();

  //   return () => {
  //     if (contract) {
  //       contract.removeAllListeners("AlertReceived");
  //     }
  //   };
  // }, []);
  



  // if (loading) {
  //   return <div>Loading alerts...</div>;
  // }

  return (
    <div className='w-full px-4 py-6'>
      <Wallet />
      {/* Full-width Alert section */}
      <div className="-mx-4 w-[calc(100%+2rem)]"> {/* Counteract parent padding */}
        <Alert />
      </div>
      
      {/* <h1 className="text-2xl font-bold mt-4">Distress Alerts</h1>
      <h3 className="text-lg mb-4">Total alerts: {alertCount}</h3>
      
      {alerts.length > 0 ? (
        <ul className="space-y-2">
          {alerts.map((alert, index) => (
            <li 
              key={index}
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <strong className="block mb-1">{alert.transcription}</strong>
              <span className="text-sm text-gray-500">
                Received at: {new Date(Number(alert.timestamp) * 1000).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No alerts found.</p>
      )} */}
    </div>
  );
}

export default App;
