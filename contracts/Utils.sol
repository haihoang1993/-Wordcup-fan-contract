// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

struct ItemSale {
    uint256 tokenId;
    address owner;
    uint256 price;
}

enum Gender {
    MALE,
    FEMALE,
    OTHER
}

struct Player {
    uint256 id;
    Gender gender;
    string name;
    string avatar;
    string country;
    uint256 yearOfBirth;
    string dateOfBirth;
}

struct UpgradeObj {
    uint256 id;
    address user;
    uint256 time;
    uint256 luckyCharms;
    bool isProtectionAmulets;
    uint256 ninjaSender;
    uint256 ninjaSub;
    uint256 strengthLevelUp;
    bool isSuccess;
    uint256 ninjaRemove;
}
