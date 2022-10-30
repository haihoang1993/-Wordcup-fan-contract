const { ethers, upgrades, network } = require('hardhat');
const JSONdb = require('simple-json-db');
const db = new JSONdb('./deployed.json');
const data = require('./data.json')
async function main() {

    const dataDeploy = data.map(e=>{
        return {
            id:0, gender:0, avatar:e.imageUrl, name:e.name,country:'-', dateOfBirth:e.date
        }
    })

    console.log(dataDeploy)

    // We get the contract to deploy
    const Factory = await ethers.getContractFactory("Manager");
    const factoryProxy = await Factory.deploy();
    const key = `${network.name}.manager`;
    db.set(key, factoryProxy.address);
    await factoryProxy.setDataMint(dataDeploy);
    const dataContract = await factoryProxy.getDataMintPlayer();
    console.log('data contract:',dataContract)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });