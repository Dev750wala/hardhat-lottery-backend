import { expect, assert } from "chai"
import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat.config"
import { Raffle } from "../../typechain-types/contracts/Raffle"
import { VRFCoordinatorV2_5Mock } from "../../typechain-types/@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock";
import { toNumber } from "ethers";

import * as fs from "fs";
import path from "path";

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle", () => {
        let raffle: Raffle, vrfCoordinatorV2_5Mock: VRFCoordinatorV2_5Mock, raffleEntranceFee: bigint, deployerGlobe: string, interval: bigint, subId: string

        beforeEach(async function () {
            const { deployer } = await getNamedAccounts()
            deployerGlobe = deployer
            await deployments.fixture(["all"])
            const deployerSigner = await ethers.getSigner(deployer)

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

            raffleEntranceFee = await raffle.getEntranceFee()
            interval = await raffle.getInterval()

            const outputPath = path.join(__dirname, "../../AAAAAAAAAAAAAA/subscriptionData.json");
            subId = JSON.parse(fs.readFileSync(outputPath, "utf-8")).subscriptionId
        })

        // CONSTRUCTOR TESTS
        describe("constructor", async function () {
            it("It initializes the contract with the correct values", async function () {
                // We make our tests only one assert per it.
                const raffleState = await raffle.getRaffleState()
                assert.equal(raffleState.toString(), '0', "Raffle state should be 0 (OPEN)")
                assert.equal(interval.toString(), '30', "Interval should be 30")
            })
        })

        // ENTER RAFFLE TESTS
        describe("enterRaffle", function () {
            it("reverts when you don't pay enough", async () => {
                await expect(raffle.enterRaffle()).to.be.revertedWithCustomError(raffle, 'Raffle__SendMoreToEnterRaffle')
            })

            it("it records players when they enter", async () => {
                await raffle.enterRaffle({ value: raffleEntranceFee })
                const playerFromContract = await raffle.getPlayer(0)
                assert.equal(playerFromContract, deployerGlobe, "Player should be the deployer")
            })

            it("it emits an event when a player enters", async () => {
                await expect(raffle.enterRaffle({ value: raffleEntranceFee }))
                    .to.emit(raffle, "RaffleEnter")
                    .withArgs(deployerGlobe)
            })

            it("doesn't allow entrance when raffle is calculating", async () => {
                await vrfCoordinatorV2_5Mock.addConsumer(subId, raffle.getAddress())
                await raffle.enterRaffle({ value: raffleEntranceFee })
                await network.provider.send("evm_increaseTime", [toNumber(interval)+1])
                await network.provider.send("evm_mine", [])

                // yet all the conditions are met, we need to make the raffle calculating
                await raffle.performUpkeep("0x")
                await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.be.revertedWithCustomError(raffle, 'Raffle__RaffleNotOpen')
            })
        });

        // checkUpKeep tests
        describe("checkUpKeep", function() {
            it("returns false if people haven't sent any ETH", async () => {
                await network.provider.send("evm_increaseTime", [toNumber(interval)+1])
                await network.provider.send("evm_mine", []) 
                
            })
        })
    })