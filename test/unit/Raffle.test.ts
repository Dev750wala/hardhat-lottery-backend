import { expect, assert } from "chai"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat.config"
import { Raffle } from "../../typechain-types/contracts/Raffle"
import { VRFCoordinatorV2_5Mock } from "../../typechain-types/@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock";

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle", () => {
        let raffle: Raffle, vrfCoordinatorV2_5Mock: VRFCoordinatorV2_5Mock

        beforeEach(async function() {
            const { deployer } = await getNamedAccounts()
            await deployments.fixture(["all"])

            raffle = await ethers.getContractAt(
                "Raffle", 
                (await deployments.get("Raffle")).address, 
                await ethers.getSigner(deployer)
            ) as unknown as Raffle

            vrfCoordinatorV2_5Mock = await ethers.getContractAt(
                "VRFCoordinatorV2_5Mock", 
                (await deployments.get("VRFCoordinatorV2_5Mock")).address, 
                await ethers.getSigner(deployer)
            ) as unknown as VRFCoordinatorV2_5Mock
        })

        describe("constructor", async function() {
            it("It initializes the contract with the correct values", async function() {
                
                // We make our tests only one assert per it.
                const raffleState = await raffle.getRaffleState()
                const interval = await raffle.getInterval()
                assert.equal(raffleState.toString(), '0', "Raffle state should be 0 (OPEN)")
                assert.equal(interval.toString(), '30', "Interval should be 30")
            })
        })
    })