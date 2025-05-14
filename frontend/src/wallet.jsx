import {useState,useEffect} from 'react';
import {ethers} from 'ethers';


function Wallet(){
    const [walletAddress, setWalletAddress] = useState(null);


    const connectWallet=async()=>{
        if(typeof window != "undefined" && window.ethereum != "undefined"){
            try{
                /*Metamask found*/
                const accounts =await window.ethereum.request({method: "eth_requestAccounts"});
                console.log("Conneted account: ",accounts[0]);
                setWalletAddress(accounts[0]);   
            }catch(err){
                console.log(err);
            }
        }else{
            alert("Please install MetaMask!");
        }
        
    }

    useEffect(()=>{
        checkIfAccountConnected();
        addWalletListener();
        
    },[]);


    const addWalletListener = async() =>{
        if(typeof window.ethereum != "undefined"){

            window.ethereum.on("accountsChanged",(accounts)=>{
                setWalletAddress(accounts[0]);
                console.log("Connected account: ",accounts[0]);
            });
            
        }else{
            setWalletAddress(null);
            console.log("Please install MetaMask!");
        }
    }

    const checkIfAccountConnected=async()=>{

        if(typeof window != "undefined" && window.ethereum != "undefined"){
            try{
                const accounts = await window.ethereum.request({method: "eth_accounts"});
                if(accounts.length > 0){
                    setWalletAddress(accounts[0]);
                    console.log("Connected account: ",accounts[0]);
                }else{
                    console.log("Connect to metamask using the connect button");
                }
            }catch(err){
                console.log(err);
            }
        }else{
            alert("Please install MetaMask!");
        }
    }

    return(
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={connectWallet}
                className={`
                px-4 py-2 
                ${walletAddress ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} 
                text-white font-medium 
                rounded-full shadow-md
                transition-colors duration-200
                border ${walletAddress ? 'border-green-600' : 'border-blue-600'}
                hover:shadow-lg
                active:scale-95
                focus:outline-none focus:ring-2 ${walletAddress ? 'focus:ring-green-400' : 'focus:ring-blue-400'}
                text-sm sm:text-base
                `}
            >
                {(walletAddress && walletAddress.length > 0) 
                ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` 
                : "Connect Wallet"}
            </button>
        </div>
    )
}


export default Wallet;