// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "../Utils.sol";

interface ManagerInterface {
    function feeAddress() external view returns (address);
    function feeMarketRate() external view returns (uint256);
    function divPercent() external view returns (uint256);
    function markets(address _address) external view returns (bool);
    function checkManager(address _address) external view returns(bool);
    function getDataMintPlayer() external view returns(Player[] memory);
}