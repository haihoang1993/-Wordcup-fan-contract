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
    string dateOfBirth;
}
