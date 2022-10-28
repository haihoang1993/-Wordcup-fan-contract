const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

describe('NFT Fan', function () {
    let instanceToken, instanceSeedRound;

    it('deploys', async function () {
        const DemoToken = await ethers.getContractFactory("DemoToken");
        instanceToken = await DemoToken.deploy("Token", "TKN", totalSupply);
    });
    it('getOwner of Proxy', async function () {
        
    });
});