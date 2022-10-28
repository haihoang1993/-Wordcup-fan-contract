require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address, await account.getBalance());
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      gas: 12000000,
      allowUnlimitedContractSize: true,
      timeout: 1800000
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: 'https://bsc-dataseed.binance.org/',
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100
          }
        },
      },
      {
        version: "0.5.16",
      },
      {
        version: "0.4.18",
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSC_API_KEY,
      bsc: process.env.BSC_API_KEY,
    },
  },

  mocha: {
    timeout: 20000,
  },
};
