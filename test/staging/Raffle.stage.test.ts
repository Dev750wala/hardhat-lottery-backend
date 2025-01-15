// import { deployments, ethers, getNamedAccounts, network } from "hardhat";
// import { developmentChains } from "../../helper-hardhat.config";
// import { Raffle } from "../../typechain-types/contracts/Raffle";

// (developmentChains.includes(network.name))
//     ? describe.skip
//     : describe("Raffle staging test", function () {
//         let raffle: Raffle, raffleEntranceFee: bigint, deployer: string

//         beforeEach(async function() {
//             const { deployerr } = await getNamedAccounts()
//             deployer = deployerr
//             // await deployments.fixture()
//             raffle = await ethers.getContractAt(
//                 "Raffle",
//                 (await deployments.get("Raffle")).address,
//                 await ethers.getSigner(deployer)
//             ) as unknown as Raffle

//             raffleEntranceFee = await raffle.getEntranceFee()
//         })

//         describe("All good", function () {
//             it("works with live Chainlink keepers and VRF", async function () {
//                 console.log("Raffle staging test");
//                 const startingTimestamp = await raffle.getLastTimeStamp()
//                 // const 
//             })
//         })  

//     })