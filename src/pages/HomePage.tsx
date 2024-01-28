import React from 'react';
import Web3 from 'web3';

import {
  Box, createTheme,
  ThemeProvider
} from "@mui/material";
import useMetaMask from "@/lib/hooks/useMetamask.ts";
import contractAbi from '../abi.json'
const AuthPage = () => {
  // const isConnected = useMetaMask();
  // const contractAddress = "0x6848ab8A45aDca9DC46Cd148FAAFE9A467Cd93E2"
  // let web3;
  // web3 = new Web3(window.ethereum);
  //
  // const myContract = new web3.eth.Contract(contractAbi, contractAddress);
  //



  return (
    <Box>
      {/*{isConnected ? <button onClick={() => createPolicy(1,1,1,"some condition")}>MetaMask is connected</button> : <p>MetaMask is not connected</p>}*/}
    </Box>
  );
};

export default AuthPage;
