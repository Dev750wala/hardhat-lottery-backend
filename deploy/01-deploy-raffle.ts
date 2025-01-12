import "hardhat-deploy"
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../helper-hardhat.config";
import { ethers, network } from "hardhat";

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if(developmentChains.includes(network.name)) {
        const vrfCoordinatorV2_5Mock = await ethers.getContractAt("VRFCoordinatorV2_5Mock", )
    }
    
    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 2
    })
}