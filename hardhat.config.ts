import { HardhatUserConfig } from "hardhat/types";
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()


const config: HardhatUserConfig = {
    solidity: "0.8.28",
};

    
export default config;