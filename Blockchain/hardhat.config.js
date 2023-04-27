/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { HTTPS, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: HTTPS,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
};