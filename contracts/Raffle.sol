// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error Raffle__NotEnoughETHEntered();

contract Raffle {
    // s_entranceFee in ETH. not USD
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    /* Events */
    event RaffleEvent (address indexed player);

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
        s_players.push(payable (msg.sender));
        emit RaffleEvent(msg.sender);
        // EVENTS: emit an event whenever the dynamic array or mapping is updated.
        // ṇamed events with the function named reversed
    }

    // function pickRandomWinner() {}

    function getEntranceFee() public view returns(uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns(address) {
        return s_players[index];
    }
}
