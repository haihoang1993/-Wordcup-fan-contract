const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const address = '0xAccde1fFD30EbFb3E18754f8e3ABc96129AD4cfB';
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