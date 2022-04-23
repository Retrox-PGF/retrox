require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const { API_MAIN, API_KOVAN, PRIVATE_KEY_KOVAN, PRIVATE_KEY_LOCAL, PRIVATE_KEY_MAIN } = process.env;

// environment variables for private keys and API links are defined using .env file
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "optimism-kovan",
  networks: {
    // for mainnet
    //'optimism': {
    // url: API_MAIN,
    // accounts: [PRIVATE_KEY_MAIN]
    //},
    // for testnet
    'optimism-kovan': {
      url: API_KOVAN,
      accounts: [PRIVATE_KEY_KOVAN]
    },
    // for the local dev environment
    //'optimism-local': {
    //  url: "http://localhost:8545",
    //  accounts: [PRIVATE_KEY_LOCAL]
    //},
  },
};
