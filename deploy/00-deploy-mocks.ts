import { developmentChains, } from "../helper-hardhat.config"
import { network } from "hardhat"
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "hardhat-deploy"

const _BASEFEE = 100000000000000000n
const _GASPRICELINK = 1000000000
const _WEIPERUNITLINK = 6148963427961250

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const chainId = network.config.chainId

    if(developmentChains.includes(network.name)) {
        log("Local network detected! deploying mocks...")

        let args = [_BASEFEE, _GASPRICELINK, _WEIPERUNITLINK]

        await deploy("VRFCoordinatorV2_5Mock", {
            from: deployer,
            log: true,
            args: args,
            contract: "VRFCoordinatorV2_5Mock"
        })
        log("Mocks deployed!")
        log("------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]