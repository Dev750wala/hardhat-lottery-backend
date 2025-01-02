// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

error Raffle__NotEnoughETHEntered();

contract Raffle is VRFConsumerBaseV2Plus {
    constructor(uint256 entranceFee, uint256 subscriptionId) VRFConsumerBaseV2Plus(0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B) {
        i_entranceFee = entranceFee;
    }
    // s_entranceFee in ETH. not USD
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    /* Events */
    event RaffleEvent(address indexed player);

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
        s_players.push(payable(msg.sender));
        emit RaffleEvent(msg.sender); 

        // EVENTS: emit an event whenever the dynamic array or mapping is updated.
        // named events with the function named reversed
    }

    function requestRandomWinner() external {
        // Request random number from Chainlink VRF
        // once we get it back, we will use it to pick a winner
        // so this is 2 transactions process
    }

    // function fulfillRandomWords(
    //     uint256 requestId,
    //     uint256[] memory randomWords
    // ) internal {}

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
