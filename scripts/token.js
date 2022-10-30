const hre = require("hardhat");
const JSONdb = require('simple-json-db');
const db = new JSONdb('./deployed.json');
async function main() {
  const DemoToken = await hre.ethers.getContractFactory("DemoToken");
  const constructParams = {
    name: "Fan TOken",
    symbol: "ATM",
    initialSupply:  hre.ethers.utils.parseEther("600000000"),
  }
  const token = await DemoToken.deploy(...Object.values(constructParams));
  await token.deployed();
  console.log("token address: ", token.address);
  const address = token.address;
  // await token.deployTransaction.wait(6);
  // await hre.run("verify:verify", {
  //   address: address,
  //   contract: "contracts/DemoToken.sol",
  //   constructorArguments: [...Object.values(constructParams)],
  // });

  const key = `${network.name}.token`;
  db.set(key, address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
