import { network } from "hardhat";
import { developmentChains } from "../../helper-hardhat.config";

(developmentChains.includes(network.name))
    ? describe.skip
    : describe("Raffle staging test", function () {
        it("")
    })