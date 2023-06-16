const hre = require("hardhat");
require("dotenv").config({ path: ".env" });
const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require("../constants");

async function main() {
  // Address of the whitelist contract that you deployed in the previous module
  const whitelistContract = WHITELIST_CONTRACT_ADDRESS;
  // URL from where we can extract the metadata for a Crypto Dev NFT
  const metadataURL = METADATA_URL;
  /*
  DeployContract in ethers.js is an abstraction used to deploy new smart contracts,
  so cryptoDevsContract here is a factory for instances of our CryptoDevs contract.
  */

 // here we deploy the contract
 const cryptoDevsContract = await hre.ethers.deployContract("CryptoDevs", [
   metadataURL,
   whitelistContract
 ]);

 // wait for the contract to deploy
 await cryptoDevsContract.waitForDeployment();

 // print the address of the deployed contract
 console.log("Crypto Devs Contract Address:", cryptoDevsContract.target);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });