var Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');

var SmartContractAddress = process.env.GOERLI_SMART_CONTRACT_ADDRESS || "0x0C6d6339F2f68ba84e3F4b8Fd2d11515A028dd40";
var CompiledContract = require('./artifacts/contracts/LockAndWithdrawHalf.sol/LockAndWithdrawHalf.json')
var SmartContractABI = CompiledContract.abi;
var address = process.env.GOERLI_ACCOUNT_ADDRESS;
var privatekey = process.env.PRIVATE_KEY_GOERLI;
var rpcurl = process.env.INFURA_URL_GOERLI;


const withdrawMyFunds = async () => {
    var provider = new Provider(privatekey, rpcurl);
    var web3 = new Web3(provider);
    var myContract = new web3.eth.Contract(SmartContractABI, SmartContractAddress);
    var owner = await myContract.methods.owner().call();
    var unlockTime = await myContract.methods.unlockTime().call();

    console.log("Owner and unlock time", owner, unlockTime);
  
    console.log("Initial wallet balance", await getCurrentBalanceInETH(), 'ETH');
    var receipt = await myContract.methods.withdrawHalf().send({ from: address });
    console.log(receipt);
    console.log("\nFinal wallet balance", await getCurrentBalanceInETH(), 'ETH');
    process.exit(0);
    
    async function getCurrentBalanceInETH() {
        const balance = await web3.eth.getBalance(address);
        return convertToETH(balance);
    }

    function convertToETH(gwei) {
        return gwei/(10**18);
    }
  }
  
  withdrawMyFunds();
