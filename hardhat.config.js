require("dotenv").config();

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomiclabs/hardhat-truffle4");
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL_MORALIS || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      timeout: 100000,
      network_id: 4,
    },
    fuji: {
      url: process.env.AVAX_TESTNET,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      network_id: 43113,
      timeoutBlocks: 200,
      networkCheckTimeout: 1000000000,
      confirmations: 5,
    },
    avaxmainnet: {
      url: process.env.AVAX_MAINNET,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      network_id: 43114,
      timeoutBlocks: 10000,
      networkCheckTimeout: 1000000000,
      confirmations: 5,
    },
    harmonyTest: {
      url: "https://api.s0.b.hmny.io",
      accounts: [
        `0x30af0727e4206ab794ec6a15cf7ceb6af66b5bf5a3e870bb8fe7b8861f83dff2`,
      ],
      // accounts:
      //   process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      // network_id: 1666700000,
      // timeoutBlocks: 10000,
      // networkCheckTimeout: 1000000000,
      // confirmations: 5,
    },
    mainnet: {
      url: process.env.MAINNET_URL_MORALIS || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      network_id: 1,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
