// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "../Utils.sol";

interface NFTinterface {
    function getPlayerByID(uint256 id) external view returns(Player memory);
    function checkOwnerOf(address _address,uint256 idNinja) external view returns(bool);
    function createPlayer(address _address, Player memory pl)  external;
    function burnChar(uint256 id) external;
}