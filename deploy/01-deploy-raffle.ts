import "hardhat-deploy"
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat.config";
import { ethers, network } from "hardhat";
import { VRFCoordinatorV2_5Mock } from "../typechain-types/@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock";
import { verify } from "../utils/verify"
import fs from "fs";
import path from "path";

const VRF_SUB_FUND_AMOUNT = ethers.parseEther("2")

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const deployerSigner = await ethers.getSigner(deployer)
    const chainId = network.config.chainId

    let vrfCoordinatorAddress: string
    let subscriptionId: bigint | string

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2_5Mock = await deployments.get("VRFCoordinatorV2_5Mock")
        vrfCoordinatorAddress = vrfCoordinatorV2_5Mock.address
        console.log("Default mock deployed is at: ", vrfCoordinatorAddress);

        // requesting subscriptionId from the mocks
        const mockContract = (await ethers.getContractAt(
            "VRFCoordinatorV2_5Mock",
            (await deployments.get("VRFCoordinatorV2_5Mock")).address,
            deployerSigner
        )) as unknown as VRFCoordinatorV2_5Mock;

        // CREATE SUBSCRIPTION
        const tx = await mockContract.createSubscription();
        const txReceipt = await tx.wait();
        const eventFilter = mockContract.filters.SubscriptionCreated();
        const logs = await mockContract.queryFilter(eventFilter, txReceipt?.blockNumber, txReceipt?.blockNumber);
        subscriptionId = logs[0]?.args?.subId;

        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
        
        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx

        // ------------------------------
        const outputPath = path.join(__dirname, "../AAAAAAAAAAAAAA/subscriptionData.json");
        const data = { subscriptionId: subscriptionId.toString() };
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log("Saved subscriptionId to:", outputPath);
        // ------------------------------

        // FUND SUBSCRIPTION
        await mockContract.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT)

    } else {
        vrfCoordinatorAddress = networkConfig[chainId as keyof typeof networkConfig]?._vrfCoordinator as string
        subscriptionId = networkConfig[chainId as keyof typeof networkConfig]?.subscriptionId as bigint | string
    }

    /*
    // CONSTRUCTOR ARGS.
        uint256 entranceFee,
        uint256 subscriptionId,
        uint256 interval,
        address _vrfCoordinator
    */

    const entranceFee = networkConfig[chainId as keyof typeof networkConfig].entranceFee
    const interval = "30"
    
    const args = [entranceFee, subscriptionId, interval, vrfCoordinatorAddress]

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,
        // waitConfirmations: 2,
        contract: "Raffle",
    })
    log("Raffle deployed at: ", raffle.address)

    if(developmentChains.includes(network.name)) {
        console.log("Adding the consumer to the mock...");
        const mockContract = (await ethers.getContractAt(
            "VRFCoordinatorV2_5Mock",
            (await deployments.get("VRFCoordinatorV2_5Mock")).address,
            deployerSigner
        )) as unknown as VRFCoordinatorV2_5Mock;
        mockContract.addConsumer(subscriptionId, raffle.address)
    }

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying contract on Etherscan...");
        await verify(raffle.address, args)
    }

    log("------------------------------------");
}

module.exports.tags = ["all", "raffle"]