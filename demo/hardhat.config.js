require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    polygonmumbai: {
      url: process.env.ALCHEMY_URL_MUMBAI,
      accounts: [process.env.PRIVATE_KEY_MUMBAI]
    },
    goerli: {
      url: process.env.INFURA_URL_SEPOLIA,
      accounts: [process.env.PRIVATE_KEY_SEPOLIA]
    }
  }
};
