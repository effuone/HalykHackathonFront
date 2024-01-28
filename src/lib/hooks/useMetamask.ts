import { useEffect, useState } from 'react';
import Web3 from 'web3';

const useMetaMask = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        checkMetaMaskConnection();
    }, []);

    const checkMetaMaskConnection = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();

                if (accounts.length > 0) {
                    setIsConnected(true);
                } else {
                    setIsConnected(false);
                    connectMetaMask();
                }
            } catch (error) {
                console.error('Error checking MetaMask connection:', error);
            }
        } else {
            console.log('MetaMask is not installed');
        }
    };

    const connectMetaMask = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setIsConnected(true);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };

    return isConnected;
};

export default useMetaMask;
