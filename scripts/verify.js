const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const constructParams = {
        name: "Fan TOken",
        symbol: "ATM",
        initialSupply:  hre.ethers.utils.parseEther("600000000"),
      }
    
    const address = '0x6f2f220F901222929d0b30E5eD5149fb290FAc76';
    await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
    });
    console.log("Factory verified to:", address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });