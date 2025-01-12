import { ethers } from "hardhat"

const networkConfig = {
    11155111: {
        name: "sepolia",
        _vrfCoordinator: "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B",
        entraceFee: ethers.parseEther("0.01")
    },
    31337: {
        name: "hardhat",
        entranceFee: ethers.parseEther("0.01")
    }
}

const developmentChains = ['hardhat', 'localhost']

export {
    networkConfig,
    developmentChains
}