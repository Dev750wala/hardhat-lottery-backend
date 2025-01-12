import { HardhatUserConfig } from "hardhat/types";
import '@typechain/hardhat'
import "hardhat-deploy"
import '@nomicfoundation/hardhat-ethers'
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
// require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL


const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [process.env.METAMASK_PRIVATE_KEY],
            chainId: 11155111
        }
    },
    solidity: "0.8.28",
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1
        }
    }
};

    
export default config;