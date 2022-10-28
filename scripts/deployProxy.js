const { ethers, upgrades, network } = require('hardhat');
const JSONdb = require('simple-json-db');
const db = new JSONdb('./deployed.json');
async function main() {
    // We get the contract to deploy
    const Factory = await ethers.getContractFactory("Test");
    const factoryProxy = await upgrades.deployProxy(Factory, { initializer: 'initialize' });
    console.log("Factory deployed to:", factoryProxy.address);
    const key = `${network.name}.Test`;
    db.set(key, factoryProxy.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });