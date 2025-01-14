import { developmentChains } from "../helper-hardhat.config";
import { ethers, network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "hardhat-deploy";
import { VRFCoordinatorV2_5Mock } from "../typechain-types/@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock";

const _BASEFEE = 100000000000000000n;
const _GASPRICELINK = 1000000000;
const _WEIPERUNITLINK = 6220544689828454;

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const deployerSigner = await ethers.getSigner(deployer);

    const chainId = network.config.chainId;

    console.log("Chain ID: ", chainId);
    console.log("Network: ", network.name);

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...");

        const args = [_BASEFEE, _GASPRICELINK, _WEIPERUNITLINK];

        await deploy("VRFCoordinatorV2_5Mock", {
            from: deployer,
            log: true,
            args: args,
            contract: "VRFCoordinatorV2_5Mock",
        });
        log("Mocks deployed!");
        log("------------------------------------");

        const mockContract = (await ethers.getContractAt(
            "VRFCoordinatorV2_5Mock",
            (await deployments.get("VRFCoordinatorV2_5Mock")).address,
            deployerSigner
        )) as unknown as VRFCoordinatorV2_5Mock;

        const tx = await mockContract.createSubscription();
        const txReceipt = await tx.wait();

        const eventFilter = mockContract.filters.SubscriptionCreated();
        const logs = await mockContract.queryFilter(eventFilter, txReceipt?.blockNumber, txReceipt?.blockNumber);
        const subscriptionId = logs[0]?.args?.subId;

        console.log(`Subscription ID: ${subscriptionId}`);
    }
};

module.exports.tags = ["all", "mocks"];
