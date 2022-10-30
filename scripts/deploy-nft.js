const { ethers, upgrades, network } = require('hardhat');
const JSONdb = require('simple-json-db');
const db = new JSONdb('./deployed.json');
async function main() {

    // We get the contract to deploy
    const Factory = await ethers.getContractFactory("FanNFT");
    const factoryProxy = await Factory.deploy('FAN NFT', 'FTN',db.get('bscTestnet.manager'), db.get('bscTestnet.token'));
    const key = `${network.name}.nft`;
    db.set(key, factoryProxy.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });