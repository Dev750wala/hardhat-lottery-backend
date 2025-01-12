import "hardhat-deploy"
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat.config";
import { ethers, network } from "hardhat";

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let vrfCoordinatorAddress: string
    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2_5Mock = await deployments.get("VRFCoordinatorV2_5Mock")
        vrfCoordinatorAddress = vrfCoordinatorV2_5Mock.address
        console.log("Default mock deployed at: ", vrfCoordinatorAddress);
    } else {
        if (
            chainId &&
            networkConfig[chainId as keyof typeof networkConfig] &&
            typeof networkConfig[chainId as keyof typeof networkConfig]._vrfCoordinator === "string"
        ) {
            vrfCoordinatorAddress = networkConfig[chainId as keyof typeof networkConfig]?._vrfCoordinator as string
        }
        else {
            throw new Error("ChainId not found in network config")
        }
    }

    /*
    // CONSTRUCTOR ARGS.
        uint256 entranceFee,
        uint256 subscriptionId,
        uint256 interval,
        address _vrfCoordinator
    */
    const entranceFee = networkConfig[chainId as keyof typeof networkConfig].entranceFee
    // const subscriptionId

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 2
    })
}