/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("@cronos-labs/hardhat-cronoscan");
require("dotenv").config();

// const PRIVATE_KEY_SET = JSON.parse(process.env.PRIVATE_KEY_SET);

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      chainId: 56,
      accounts: [process.env.PRIVATE_KEY],
    },
    avalanche: {
      url: "https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc",
      chainId: 43114,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: "https://polygon.llamarpc.com/",
      chainId: 137,
      accounts: [process.env.PRIVATE_KEY],
    },
    valobit: {
      url: "https://rpc.mnet.vblockchain.io/",
      chainId: 2535,
      accounts: [process.env.PRIVATE_KEY],
    },
    // ethereum: {
    //   url: "https://rpc.builder0x69.io",
    //   chainId: 1,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // opera: {
    //   url: "https://fantom.blockpi.network/v1/rpc/public",
    //   chainId: 250,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // cronosMainNet: {
    //   url: "https://evm.cronos.org",
    //   chainId: 25,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // cronosMainNet: {
    //   url: "https://bsc-dataseed.binance.org",
    //   chainId: 56,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // cronosMainNet: {
    //   url: "https://bsc-dataseed.binance.org",
    //   chainId: 56,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // kucoinMainNet: {
    //   url: "https://bsc-dataseed.binance.org",
    //   chainId: 56,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // bitTorrentMainNet: {
    //   url: "https://bsc-dataseed.binance.org",
    //   chainId: 56,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // cronos: {
    //   url: "https://cronos.blockpi.network/v1/rpc/public",
    //   chainId: 25,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // avalancheFujiTestnet: {
    //   url: "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc",
    //   chainId: 43113,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // goerli: {
    //   url: "https://goerli.blockpi.network/v1/rpc/public",
    //   chainId: 5,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
    // bscTestnet: {
    //   url: "https://data-seed-prebsc-1-s1.binance.org:8545",
    //   chainId: 97,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
  solidity: {
    compilers: [
      {
        version: "0.4.24",
      },
      {
        version: "0.8.0",
      },
      {
        version: "0.8.1",
      },
      {
        version: "0.8.2",
      },
      {
        version: "0.8.9",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: {
      bsc: process.env.BSCSCAN_API_KEY,
      polygon: process.env.MATIC_API_KEY,
      avalanche: process.env.SNOWSCAN_API_KEY,
      valobit: process.env.VALOBITSCAN_API_KEY,
      // mainnet: process.env.ETHERSCAN_API_KEY,
      // rinkeby: process.env.ETHERSCAN_API_KEY,
      // goerli: process.env.ETHERSCAN_API_KEY,
      // ropsten: process.env.ETHERSCAN_API_KEY,
      // polygonMumbai: process.env.MATIC_API_KEY,
      // bscTestnet: process.env.BSCSCAN_API_KEY,
      // opera: process.env.FTMSCAN_API_KEY,
      // cronos: process.env.CROSCAN_API_KEY,
    },
    customChains: [
      {
        network: "valobit",
        chainId: 2535,
        urls: {
          apiURL: "https://valobitscan.io/api",
          browserURL: "https://valobitscan.io/",
        },
      },
    ],
  },
  mocha: {
    timeout: 40000,
  },
};
