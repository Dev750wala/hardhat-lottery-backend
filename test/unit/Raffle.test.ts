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

        // pay in link
        const ENABLE_NATIVE_PAYMENT = false

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

            await vrfCoordinatorV2_5Mock.addConsumer(subId, raffle.getAddress())
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
                // await vrfCoordinatorV2_5Mock.addConsumer(subId, raffle.getAddress())
                await raffle.enterRaffle({ value: raffleEntranceFee })
                await network.provider.send("evm_increaseTime", [toNumber(interval) + 1])
                await network.provider.send("evm_mine", [])

                // yet all the conditions are met, we need to make the raffle calculating
                await raffle.performUpkeep(
                    new ethers.AbiCoder().encode(["bool"], [ENABLE_NATIVE_PAYMENT])
                )
                await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.be.revertedWithCustomError(raffle, 'Raffle__RaffleNotOpen')
            })
        });

        // checkUpKeep tests
        describe("checkUpKeep", function () {
            it("returns false if people haven't sent any ETH", async () => {
                await network.provider.send("evm_increaseTime", [toNumber(interval) + 1])
                await network.provider.send("evm_mine", [])
                const { upkeepNeeded } = await raffle.checkUpkeep("0x")
                assert(!upkeepNeeded, "Upkeep should not be needed")
            })

            it("returns false if raffle isn't open", async () => {
                // await vrfCoordinatorV2_5Mock.addConsumer(subId, raffle.getAddress())
                await raffle.enterRaffle({ value: raffleEntranceFee })
                await network.provider.send("evm_increaseTime", [toNumber(interval) + 1])
                await network.provider.send("evm_mine", [])
                await raffle.performUpkeep(
                    new ethers.AbiCoder().encode(["bool"], [ENABLE_NATIVE_PAYMENT])
                )
                const raffleState = await raffle.getRaffleState()
                const { upkeepNeeded } = await raffle.checkUpkeep("0x")
                assert.equal(
                    raffleState.toString(),
                    '1',
                )
                assert.equal(
                    upkeepNeeded,
                    false
                )
            })

            it("returns false if enough time hasn't passed", async () => {
                await raffle.enterRaffle({ value: raffleEntranceFee })
                await network.provider.send("evm_increaseTime", [toNumber(interval) - 3])
                await network.provider.request({ method: "evm_mine", params: [] })
                const { upkeepNeeded } = await raffle.checkUpkeep("0x")
                assert(!upkeepNeeded)
            })

            it("returns true if enough time has passed, has players, eth, and is open", async() => {
                await raffle.enterRaffle({ value: raffleEntranceFee })
                await network.provider.send("evm_increaseTime", [toNumber(interval) + 1])
                await network.provider.request({ method: "evm_mine", params: [] })
                const { upkeepNeeded } = await raffle.checkUpkeep("0x")
                assert(upkeepNeeded)
            })
        })

        // performUpkeep tests
        describe("performUpkeep", function () {
            it("it can only run if checkUpKeep is true", async () => {
                await raffle.enterRaffle({ value: raffleEntranceFee })
                await network.provider.send("evm_increaseTime", [toNumber(interval) + 1])
                await network.provider.request({ method: "evm_mine", params: [] })
                const tx = await raffle.performUpkeep(
                    new ethers.AbiCoder().encode(["bool"], [ENABLE_NATIVE_PAYMENT])
                )
                assert(tx)
            })

            it("reverts when checkUpKeep is false", async () => {
                await expect(raffle.performUpkeep(
                    new ethers.AbiCoder().encode(["bool"], [ENABLE_NATIVE_PAYMENT])
                )).to.be.revertedWithCustomError(raffle, 'Raffle__UpkeepNotNeeded')
            })

            it("updates the raffle state (calculating) and emits a requestId", async () => {
                await raffle.enterRaffle({ value: raffleEntranceFee })
                await network.provider.send("evm_increaseTime", [toNumber(interval) + 1])
                await network.provider.request({ method: "evm_mine", params: [] })
                
                const tx = await raffle.performUpkeep(
                    new ethers.AbiCoder().encode(["bool"], [ENABLE_NATIVE_PAYMENT])
                )
                const txReceipt = await tx.wait(1)
                const temp = vrfCoordinatorV2_5Mock.filters.RandomWordsRequested()
                const logs2 = await vrfCoordinatorV2_5Mock.queryFilter(temp, txReceipt?.blockNumber, txReceipt?.blockNumber);
                
                let requestId = logs2[0]?.args?.requestId;
                const raffleState = await raffle.getRaffleState()

                // console.log("requestId: ", requestId); // should be one on mock contract
                
                assert(toNumber(requestId)>0)
                assert.equal(raffleState.toString(), '1', "Raffle state should be 1 (CALCULATING)")
            })
        })

        describe("getRequestStatus", function () {
            let requestId: any;
            beforeEach(async function() {
                await vrfCoordinatorV2_5Mock.fundSubscription(subId, 100000000000000000000n)

                await raffle.enterRaffle({ value: raffleEntranceFee })
                await network.provider.send("evm_increaseTime", [toNumber(interval) + 1])
                await network.provider.request({ method: "evm_mine", params: [] })

                const tx = await raffle.performUpkeep(
                    new ethers.AbiCoder().encode(["bool"], [ENABLE_NATIVE_PAYMENT])
                )
                const txReceipt = await tx.wait(1)
                const temp = vrfCoordinatorV2_5Mock.filters.RandomWordsRequested()
                const logs = await vrfCoordinatorV2_5Mock.queryFilter(
                    temp, 
                    txReceipt?.blockNumber, 
                    txReceipt?.blockNumber
                );

                requestId = logs[0]?.args?.requestId;
            })

            it("should return the fulfilled status as false for an unfulfilled request", async () => {
                const { fulfilled } = await raffle.getRequestStatus(requestId)
                assert.equal(fulfilled, false)
            })
            
            it("should return the fulfilled status as true for a fulfilled request", async () => {
                // fulfilling the request manually here through the mock contract
                await vrfCoordinatorV2_5Mock.fulfillRandomWords(
                    requestId, 
                    raffle.getAddress()
                )

                const { fulfilled } = await raffle.getRequestStatus(requestId)
                assert.equal(fulfilled, true)
            })

            it("should return the correct random words for a fulfilled request", async () => {
                await vrfCoordinatorV2_5Mock.fulfillRandomWords(
                    requestId,
                    raffle.getAddress()
                )

                const { randomWords } = await raffle.getRequestStatus(requestId)
                // console.log("randomWords: ", randomWords);   // should be an array of 1 random number.
                
                assert(randomWords[0] > 0)
            })

            it("should revert if the request ID does not exist", async () => {
                await expect(raffle.getRequestStatus(0)).to.be.revertedWith("request not found")
            })

            it("should correctly return data for the latest request ID when multiple requests are made", async () => {
                const tx2 = await raffle.performUpkeep(
                    new ethers.AbiCoder().encode(["bool"], [ENABLE_NATIVE_PAYMENT])
                )
                const txReceipt2 = await tx2.wait(1)
                const temp = vrfCoordinatorV2_5Mock.filters.RandomWordsRequested()
                const logs = await vrfCoordinatorV2_5Mock.queryFilter(
                    temp,
                    txReceipt2?.blockNumber,
                    txReceipt2?.blockNumber
                );

                var requestId2 = logs[0]?.args?.requestId;

                await assert.equal(raffle.lastRequestId , requestId2)
            })
        })
    })