var Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');

var SmartContractAddress = process.env.SEPOLIA_SMART_CONTRACT_ADDRESS || "0x3bdb8a61100A006a0ef0Af338eF1008E7d343348";
var CompiledContract = require('../artifacts/contracts/DeveloperWeekDemo.sol/DeveloperWeekDemo.json')
var SmartContractABI = CompiledContract.abi;
var address = process.env.MUMBAI_ACCOUNT_ADDRESS;
var privatekey = process.env.PRIVATE_KEY_MUMBAI;
var rpcurl = process.env.ALCHEMY_URL_MUMBAI;


const withdrawAndMarkAttendance = async () => {
    var provider = new Provider(privatekey, rpcurl);
    var web3 = new Web3(provider);
    var myContract = new web3.eth.Contract(SmartContractABI, SmartContractAddress);
    var owner = await myContract.methods.owner().call();
    var unlockTime = await myContract.methods.unlockTime().call();

    console.log("Owner address", owner);
    console.log("Unlock time",  new Date(unlockTime * 1000).toLocaleString());
  
    console.log("Initial wallet balance", await getCurrentBalanceInETH(), 'ETH');
    var receipt = await myContract.methods.withdrawHalf().send({ from: address });
    console.log(receipt);
    console.log("\nFinal wallet balance", await getCurrentBalanceInETH(), 'ETH');

    var receipt2 = await myContract.methods.markAttendance('Anastasia', 10).send({ from: address });
    console.log(receipt2);
    process.exit(0);
    
    async function getCurrentBalanceInETH() {
        const balance = await web3.eth.getBalance(address);
        return convertToETH(balance);
    }

    function convertToETH(gwei) {
        return gwei/(10**18);
    }
  }
  
  withdrawAndMarkAttendance();