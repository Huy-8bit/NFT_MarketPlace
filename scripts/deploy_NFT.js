const { ethers } = require("hardhat");
const fs = require("fs");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
const utils = ethers.utils;

// comandline: npx hardhat run scripts/deploy_NFT.js --network sepolia

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy WibuToken
  // const WibuToken = await ethers.getContractFactory("WibuToken");
  // const wibuToken = await WibuToken.deploy();
  // await wibuToken.deployed();
  // // save in file
  // let addressFilePath = "wibuTokenAddress.txt";
  // fs.writeFileSync(addressFilePath, wibuToken.address);

  // console.log("WibuToken address:", wibuToken.address);

  // console.log(
  //   "Token total supply:",
  //   (await wibuToken.totalSupply()).toString()
  // );

  // deploy NFT
  const NFT = await ethers.getContractFactory("Wibu_NFTMarketplace");
  const nft = await NFT.deploy("0x3837e290fe5dF1222177f7478221A9E34fFAb6F8");

  console.log("NFT address: ", nft.address);

  addressFilePath = "NFT_address.txt";
  fs.writeFileSync(addressFilePath, nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
