var Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');

var SmartContractAddress = "0x9E9DD02777816e72A77C4D4043927e6c875D4e1C";
var CompiledContract = require('../artifacts/contracts/ATODemo.sol/ATODemo.json')
var SmartContractABI = CompiledContract.abi;
var address = process.env.MUMBAI_ACCOUNT_ADDRESS;
var privatekey = process.env.PRIVATE_KEY_MUMBAI;
var rpcurl = process.env.ALCHEMY_URL_MUMBAI;


const withdrawAndMarkAttendance = async () => {
    var provider = new Provider(privatekey, rpcurl);
    var web3 = new Web3(provider);
    var myContract = new web3.eth.Contract(SmartContractABI, SmartContractAddress);
    var owner = await myContract.methods.owner().call();

    console.log("Owner address", owner);
  
    console.log("Initial wallet balance", await getCurrentBalanceInETH(), 'ETH');
    var receipt = await myContract.methods.withdrawHalf().send({ from: address });
    console.log(receipt);
    console.log("\nFinal wallet balance", await getCurrentBalanceInETH(), 'ETH');

    var receipt2 = await myContract.methods.markAttendance('Anastasia2', 'Raleigh', false).send({ from: address });
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