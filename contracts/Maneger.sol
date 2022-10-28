// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import './interface/ManagerInterface.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "./EnumerableSet.sol";
import "./Utils.sol";

contract Manager is ManagerInterface {
    using SafeMath for uint256;
     using SafeERC20 for IERC20;
     using EnumerableSet for EnumerableSet.UintSet;
     
    using Address for address;
    mapping(address => Player) players;
    address _feeAddress;

    
    uint256 _feeMarketRate;
    uint256 _divPercent;
    
     address public contractNFT;
     address contractStake;
     address ownerContract;

    mapping(address =>bool) listAdmin;

    Player[] dataMint;

    constructor() {
        _feeAddress=msg.sender;
        ownerContract=msg.sender;
        _feeMarketRate=5;
        _divPercent=100;
    }
    
     /**
        * @dev Throws if called by any account other than the owner.
        */
    modifier onlyOwner() {
        require(msg.sender == ownerContract);
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender==contractNFT||msg.sender==ownerContract||contractStake==msg.sender||msg.sender==address(this)||listAdmin[msg.sender]);
        _;
    }
    
    
    function setContractNFT(address _contract) public onlyOwner{
        contractNFT=_contract;
    }
    
    function feeAddress() external view override returns (address) {
        return _feeAddress;
    }
    
    function feeMarketRate() external view override returns (uint256) {
        return _feeMarketRate;
    }

    function divPercent() external view override returns (uint256) {
        return _divPercent;   
    }

    function markets(address _address) external view override returns (bool) {
        return _address==contractNFT;
    }
    
    function checkManager(address _address) external override view returns(bool){
         return (_address==contractNFT||_address==ownerContract||contractStake==_address||_address==address(this)||listAdmin[_address]);
     }

     function getDataMintPlayer() external override view returns(Player[] memory){
         return dataMint;
     }

     function setDataMint(Player[] memory list) public {
        //  dataMint[0]=list[0];
        for (uint256 index = 0; index < list.length; index++) {
            dataMint.push(list[index]);
        }
     }
}