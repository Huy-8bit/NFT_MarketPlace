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
  let addressFilePath = "wibuTokenAddress.txt";

  // deploy WibuToken
  // const WibuToken = await ethers.getContractFactory("WibuToken");
  // const wibuToken = await WibuToken.deploy();
  // await wibuToken.deployed();
  // fs.writeFileSync(addressFilePath, wibuToken.address);
  // console.log("WibuToken address:", wibuToken.address);
  // console.log(
  //   "Token total supply:",
  //   (await wibuToken.totalSupply()).toString()
  // );

  // deploy NFT
  // const NFT = await ethers.getContractFactory("WibuNFT");
  // const nft = await NFT.deploy();

  // console.log("NFT address: ", nft.address);

  // addressFilePath = "NFT_address.txt";
  // fs.writeFileSync(addressFilePath, nft.address);

  // deploy NFTMarketplace
  const Wibu_NFTMarketplace = await ethers.getContractFactory(
    "NFT_marketPlace"
  );
  const wibuMarketPlace = await Wibu_NFTMarketplace.deploy(
    "0x59627572dc94c3B24ab45D2D2f8434E50B87D76A",
    "0x88F0c848e2D1e95aCb90a12dA82eb1bbE738a7A0"
  );

  console.log("wibuMarketPlace address: ", wibuMarketPlace.address);

  addressFilePath = "wibuMarketPlace.txt";
  fs.writeFileSync(addressFilePath, wibuMarketPlace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
