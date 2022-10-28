const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai')

describe('NFT Fan', function () {
    let instanceToken, instanceManager, instanceNFT;

    const totalSupply = ethers.utils.parseEther("1000000");
    let accounts = null;

    it('deploys', async function () {
        accounts = await ethers.getSigners();
        const DemoToken = await ethers.getContractFactory("DemoToken");
        const Manager = await ethers.getContractFactory("Manager");
        const NFT = await ethers.getContractFactory("FanNFT");
        instanceToken = await DemoToken.deploy("Token", "TKN", totalSupply);
        instanceManager= await Manager.deploy();
        console.log('in:',instanceManager.address)
        instanceNFT= await NFT.deploy('NFT Fan', "FAN", instanceManager.address, instanceToken.address);
    });

    it('check getOwner of manager', async function () {
        const check = await instanceManager.checkManager(accounts[0].address);
        expect(check).to.equal(true);
    });

    it('create nft ', async function () {
        await instanceNFT.createPlayer(accounts[0].address,{
            id:0, gender:0, avatar:'link', name:'messi',country:'arg',yearOfBirth:1987, dateOfBirth:'26/06'
        })
    });
    
    it('get list my nft ', async function () {
        const data =  await instanceNFT.getPlayersOf(accounts[0].address)
        console.log('data',data);
    });
    
});