require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require('@nomiclabs/hardhat-etherscan');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const { API_MAIN, API_KOVAN, PRIVATE_KEY_KOVAN, PRIVATE_KEY_LOCAL, PRIVATE_KEY_MAIN, ETHERSCAN_API_KEY, PRIVATE_KEY_1,PRIVATE_KEY_2,PRIVATE_KEY_3,PRIVATE_KEY_4,PRIVATE_KEY_5} = process.env;

// environment variables for private keys and API links are defined using .env file
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "optimism-kovan",
  etherscan: {
    apiKey: {
      optimisticKovan: "M663MZBQMCKRNDACGZRM4RIAG86VJ5KVQD"
    }
  },
  networks: {
    // for mainnet
    //'optimism': {
    // url: API_MAIN,
    // accounts: [PRIVATE_KEY_MAIN]
    //},
    // for testnet
    'optimism-kovan': {
      url: API_KOVAN,
      accounts: [PRIVATE_KEY_1,PRIVATE_KEY_2,PRIVATE_KEY_3,PRIVATE_KEY_4,PRIVATE_KEY_5],
      gas: 9000000
    },
    'optimism-local': {
     url: "http://localhost:8545"
    },
  },
};
