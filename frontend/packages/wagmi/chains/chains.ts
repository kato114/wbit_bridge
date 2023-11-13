import { rinkeby, mainnet, goerli } from 'wagmi/chains'
import { Chain } from 'wagmi'

export const ether: Chain = {
  id: 1,
  name: 'Ethereum Mainnet',
  network: 'Ethereum Mainnet',
  rpcUrls: {
    default: 'https://eth-rpc.gateway.pokt.network/',
  },
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 14353601,
  },
}

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
    default: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 17422483,
  },
  testnet: false,
}

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    public: 'https://bsc-dataseed1.binance.org',
    default: 'https://bsc-dataseed1.binance.org',
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 15921452,
  },
}

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
}

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche_fuji',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 7096959,
  },
  testnet: false,
}

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.ftm.tools',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 33001987,
  },
}

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.testnet.fantom.network',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 8328688,
  },
  testnet: false,
}

export const polygonMainnet: Chain = {
  id: 137,
  name: 'Polygon Mainnet',
  network: 'Polygon Mainnet',
  nativeCurrency: { name: 'Polygon', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    default: 'https://polygon-mainnet.public.blastapi.io',
  },
  blockExplorers: {
    default: {
      name: 'PolygonScan',
      url: 'https://polygonscan.com/',
    },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 25770160,
  },
}

export const mumbai: Chain = {
  id: 80001,
  name: 'Mumbai',
  network: 'Mumbai',
  nativeCurrency: { name: 'Polygon', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    default: 'https://endpoints.omniatech.io/v1/matic/mumbai/public',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://mumbai.polygonscan.com',
    },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 8328688,
  },
  testnet: false,
}

export const cronos: Chain = {
  id: 25,
  name: 'Cronos Mainnet Beta',
  network: 'Cronos Mainnet Beta',
  nativeCurrency: { name: 'Cronos', symbol: 'CRO', decimals: 18 },
  rpcUrls: {
    default: 'https://evm.cronos.org',
  },
  blockExplorers: {
    default: {
      name: 'Cronoscan',
      url: 'https://cronoscan.com',
    },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 1963112,
  },
}

export const cronosTestnet: Chain = {
  id: 338,
  name: 'Cronos',
  network: 'Cronos Testnet',
  nativeCurrency: { name: 'Cronos', symbol: 'TCRO', decimals: 18 },
  rpcUrls: {
    default: 'https://evm-t3.cronos.org',
  },
  blockExplorers: {
    default: {
      name: 'CronosScan',
      url: 'https://testnet.cronoscan.com',
    },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 8328688,
  },
  testnet: false,
}

export const valobit: Chain = {
  id: 2535,
  name: 'Valobit Mainnet',
  network: 'valobit-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'VBIT',
    symbol: 'VBIT',
  },
  rpcUrls: {
    public: 'https://rpc.mnet.vblockchain.io/',
    default: 'https://rpc.mnet.vblockchain.io/',
  },
  blockExplorers: {
    default: { name: 'ValobitScan', url: 'https://valobitscan.io/' },
  },
  multicall: {
    address: '0x933099C5BCD886Cd3a59a4F1258aAEd84fc3983f',
    blockCreated: 1428239,
  },
}

export const dyno: Chain = {
  id: 7363,
  name: 'DND Network Mainnet',
  network: 'dyno-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Dyno Chain Native Token',
    symbol: 'DND',
  },
  rpcUrls: {
    public: 'https://rpc.dynochain.io/',
    default: 'https://rpc.dynochain.io/',
  },
  blockExplorers: {
    default: { name: 'DynoScan', url: 'https://dynoscan.io/' },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 17422483,
  },
}

export const dynoTest: Chain = {
  id: 7364,
  name: 'DND Network Testnet',
  network: 'dyno-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Dyno Chain Native Token',
    symbol: 'tDND',
  },
  rpcUrls: {
    public: 'https://rpctest.dynochain.io/',
    default: 'https://rpctest.dynochain.io/',
  },
  blockExplorers: {
    default: { name: 'DynoScan', url: 'https://testnet.dynoscan.io/' },
  },
  multicall: {
    address: '0xFB2aAb966943d4e88CA0d1533c949a4849deBD12',
    blockCreated: 670512,
  },
  testnet: false,
}

export { rinkeby, mainnet, goerli }
