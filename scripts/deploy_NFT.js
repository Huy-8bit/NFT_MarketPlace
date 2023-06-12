const { ethers } = require("hardhat");
const fs = require("fs");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
const utils = ethers.utils;

// comandline: npx hardhat run scripts/deploy_NFT.js --network sepolia

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const NFT = await ethers.getContractFactory("NFTMarketplace");
  const nft = await NFT.deploy("0xb0f01D9C892A6ad93072E077A28c82Aa891Ce576");

  console.log("NFT address: ", nft.address);

  const addressFilePath = "NFT_address.txt";
  fs.writeFileSync(addressFilePath, nft.address);

  // create a firt nft
  const link_nft = "https://token-uri-2.com";
  const pre_name_nft = 10000;
  console.log("link nft: ", link_nft);
  console.log("pre_name_nft: ", pre_name_nft);
  await nft.createToken(link_nft, pre_name_nft);
  const addressFilePath2 = "NFT_tokenid.txt";
  // fs.writeFileSync(addressFilePath2, newTokenId);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
