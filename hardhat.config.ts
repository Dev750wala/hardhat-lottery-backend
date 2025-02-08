import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox";
// import "@typechain/hardhat"
// import "@nomiclabs/hardhat-waffle"
// require("@nomiclabs/hardhat-etherscan")
import '@nomicfoundation/hardhat-ethers';
import "hardhat-deploy"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@nomicfoundation/hardhat-verify"
import * as dotenv from "dotenv"
dotenv.config()


const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL


const config: HardhatUserConfig = {
    defaultNetwork: "localhost",
    networks: {
        localhost: {
            url: "HTTP://127.0.0.1:8545"  
        },
        hardhat: {
            chainId: 31337,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [process.env.METAMASK_PRIVATE_KEY],
            chainId: 11155111
        },
        ganache: {
            url: "HTTP://172.21.208.1:7545",
            accounts: [
                "0xf4127351e9fabd7de3f76f2d1acd7adbd27f29337d866e2ca166a9ad131d1d55",
                "0x0439839b17ecab637bd81fce5fabaf90b273d0d6f862fb43fb095a6c40845fc7"
            ],
            chainId: 1337
        }
    },
    gasReporter: {
        currency: 'USD',
        enabled: false
    },
    // accounts provided here will be accessible with getNamesAccounts function. 
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1
        }
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_API_KEY,
        }
    },
    solidity: "0.8.28",
};

    
export default config;