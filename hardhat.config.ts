import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "@nomiclabs/hardhat-waffle"
// require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("@nomicfoundation/hardhat-verify")
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
        },
        ganache: {
            url: "HTTP://172.21.208.1:7545",
            accounts: [
                "0xbae8ba8ad5a25edcac890d18632491972502041e3e7fd0831a1e9821c59efed0",
                "0x49d6dae9182dfcaf3f9dc443b819bf970c74e67af04f5a59c990656091c4b284"
            ],
            chainId: 1337
        }
    },
    gasReporter: {
        currency: 'USD',
        enabled: false
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1
        }
    },
    solidity: "0.8.28",
};

    
export default config;