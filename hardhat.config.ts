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
    defaultNetwork: "ganache",
    networks: {
        // hardhat: {
        //     chainId: 31337,
        // },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [process.env.METAMASK_PRIVATE_KEY],
            chainId: 11155111
        },
        ganache: {
            url: "HTTP://172.21.208.1:7545",
            accounts: ["0xbae8ba8ad5a25edcac890d18632491972502041e3e7fd0831a1e9821c59efed0"],
            chainId: 1337
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