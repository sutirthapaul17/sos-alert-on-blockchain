

import React from 'react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import contractABI from './contract/sos.json'; // Adjust the path to your ABI file


const contractAddress = "0xa5AB387AB975EF1FFF6F1E5Bb0f757952F3c83Ec";

function Alert() {
    const [alerts, setAlerts] = useState([]);
    const [contract, setContract] = useState(null);
    const [count,setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const init = async () => {
        //     if (window.ethereum) {
        //         const provider = new ethers.BrowserProvider(window.ethereum);
        //         const signer = await provider.getSigner();
        //         const contractInstance = new ethers.Contract(contractAddress, contractABI.abi, signer);
        //         setContract(contractInstance);

        //         try {
        //             const count = await contractInstance.getAlertCount();
        //             setCount(Number(count));
        //             const alertsArray = [];

        //             for (let i = 0; i < count; i++) {
        //                 const [transcription, timestamp] = await contractInstance.getAlert(i);
        //                 alertsArray.push({
        //                     transcription,
        //                     timestamp: Number(timestamp),
        //                 });
        //             }
        //             setAlerts(alertsArray);
        //         } catch (error) {
        //             console.error("Error fetching alerts:", error);
        //         }
        //     }
        // };
        // init();
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress, contractABI.abi, signer);
                setContract(contractInstance);
        
                try {
                    const count = await contractInstance.getAlertCount();
                    setCount(Number(count));
                    const alertsArray = [];
        
                    for (let i = 0; i < count; i++) {
                        const [transcription, timestamp] = await contractInstance.getAlert(i);
                        alertsArray.push({
                            transcription,
                            timestamp: Number(timestamp),
                        });
                    }
                    
                    // Reverse the array to show newest alerts first
                    const reversedAlerts = alertsArray.reverse();
                    setAlerts(reversedAlerts);
                } catch (error) {
                    console.error("Error fetching alerts:", error);
                }
            }
        };
        init();
    }, []);


    const refreshAlerts = async () => {
        try {
            setLoading(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractABI.abi, signer);
            const count = await contractInstance.getAlertCount();
            setCount(Number(count));
    
            const alertsArray = [];
    
            for (let i = 0; i < count; i++) {
                const [transcription, timestamp] = await contractInstance.getAlert(i);
                alertsArray.push({ transcription, timestamp: Number(timestamp) });
            }
    
            setAlerts(alertsArray.reverse()); // Newest first
        } catch (error) {
            console.error("Error refreshing alerts:", error);
        } finally {
            setLoading(false);
        }
    };


    const etherScan = () => {
        const etherscanUrl = `https://sepolia.etherscan.io/address/${contractAddress}`;
        window.open(etherscanUrl, '_blank'); // Opens in a new tab
    };

    return (
        <div className="w-full px-4 py-6 bg-gray-100 ">
            <div className="w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Alerts</h1>
                <div className="space-y-4">
                    <h2><b>Contract address:{contractAddress}</b></h2>
                    <button
                        onClick={refreshAlerts}
                        disabled={loading}
                        className="absolute top-20 right-6 flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-150 ease-in-out rounded-md shadow-sm text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform ${loading ? "animate-spin" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                        </svg>
                        {loading ? "Refreshing..." : "Refresh"}
                    </button>
                    <button
                        onClick={etherScan}
                        className="
                            px-4 py-2 
                            bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                            text-white font-medium 
                            rounded-lg shadow-md 
                            transition-all duration-200 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                            transform hover:scale-105 active:scale-95
                        "
                        >
                        Check on Etherscan
                    </button>
                    {alerts.length === 0 ? (
                        <p className="text-center text-gray-500">No alerts available.</p>
                    ) : (
                        alerts.map((alert, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
                            >
                                <p className="text-gray-700">{alert.transcription}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(alert.timestamp * 1000).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Alert;
