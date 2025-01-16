import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../../helper-hardhat.config";
import { Raffle } from "../../typechain-types/contracts/Raffle";
import { expect, assert } from "chai"

(developmentChains.includes(network.name))
    ? describe.skip
    : describe("Raffle staging test", function () {
        let raffle: Raffle, raffleEntranceFee: bigint, deployer: string

        beforeEach(async function () {
            const { deployerr } = await getNamedAccounts()

            deployer = deployerr

            raffle = await ethers.getContractAt(
                "Raffle",
                (await deployments.get("Raffle")).address,
                await ethers.getSigner(deployer)
            ) as unknown as Raffle

            raffleEntranceFee = await raffle.getEntranceFee()
        })

        describe("fulfillRandomWords", function () {
            it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async function () {
                console.log("Raffle staging test");
                const startingTimeStamp = await raffle.getLastTimeStamp()
                const accounts = await ethers.getSigners()

                console.log("Setting up Listener...")
                await new Promise(async (resolve, reject) => {
                    // setup listener before we enter the raffle
                    // Just in case the blockchain moves REALLY fast
                    raffle.once(raffle.filters.WinnerPicked(), async () => {
                        console.log("WinnerPicked event fired!")
                        try {
                            // add our asserts here
                            const recentWinner = await raffle.getRecentWinner()
                            const raffleState = await raffle.getRaffleState()
                            const winnerEndingBalance = await ethers.provider.getBalance(accounts[0])
                            const endingTimeStamp = await raffle.getLastTimeStamp()

                            await expect(raffle.getPlayer(0)).to.be.reverted
                            assert.equal(recentWinner.toString(), accounts[0].address)
                            assert.equal(raffleState, 0n)
                            assert.equal(
                                winnerEndingBalance.toString(),
                                (winnerStartingBalance + raffleEntranceFee).toString()
                            )
                            assert(endingTimeStamp > startingTimeStamp)
                            resolve("Ok, we're done!")
                        } catch (error) {
                            console.log(error)
                            reject(error)
                        }
                    })
                    // Then entering the raffle
                    console.log("Entering Raffle...")
                    const tx = await raffle.enterRaffle({ value: raffleEntranceFee })
                    await tx.wait(1)
                    console.log("Ok, time to wait...")
                    const winnerStartingBalance = await ethers.provider.getBalance(accounts[0])

                    // and this code WONT complete until our listener has finished listening!
                })
            })
        })
    })