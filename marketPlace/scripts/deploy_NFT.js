const { ethers } = require("hardhat");
const fs = require("fs");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
const utils = ethers.utils;

// comandline: npx hardhat run scripts/deploy_NFT.js --network sepolia

const nftFilePath = "./deployment/nft.json";
const wibuTokenFilePath = "./deployment/wibuToken.json";
const wibuMarketPlaceFilePath = "./deployment/wibuMarketPlace.json";
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // // deploy WibuToken
  // const WibuToken = await ethers.getContractFactory("WibuToken");
  // const wibuToken = await WibuToken.deploy();
  // await wibuToken.deployed();
  // console.log("WibuToken address:", wibuToken.address);
  // console.log(
  //   "Token total supply:",
  //   (await wibuToken.totalSupply()).toString()
  // );
  // const wibuTokenData = {
  //   tokenAddress: wibuToken.address,
  // };
  // const wibuTokenJsonData = JSON.stringify(wibuTokenData, null, 2);
  // fs.writeFileSync(wibuTokenFilePath, wibuTokenJsonData);

  // // deploy NFT
  // const NFT = await ethers.getContractFactory("WibuNFT");
  // const nft = await NFT.deploy();
  // await nft.deployed();
  // console.log("NFT address: ", nft.address);
  // const nftData = {
  //   NFTAddress: nft.address,
  // };
  // const nftJsonData = JSON.stringify(nftData, null, 2);
  // fs.writeFileSync(nftFilePath, nftJsonData);

  // deploy NFTMarketplace
  const nftJsonData = fs.readFileSync(nftFilePath, "utf-8");
  const nftData = JSON.parse(nftJsonData);
  const NFTAddress = nftData.NFTAddress;

  const wibuTokenJsonData = fs.readFileSync(wibuTokenFilePath, "utf-8");
  const wibuTokenData = JSON.parse(wibuTokenJsonData);
  const tokenAddress = wibuTokenData.tokenAddress;

  const Wibu_NFTMarketplace = await ethers.getContractFactory(
    "NFT_marketPlace"
  );
  console.log("NFTAddress: ", NFTAddress);
  console.log("tokenAddress: ", tokenAddress);

  const wibuMarketPlace = await Wibu_NFTMarketplace.deploy(
    NFTAddress,
    tokenAddress
  );
  await wibuMarketPlace.deployed();
  console.log("WibuMarketPlace address: ", wibuMarketPlace.address);
  const wibuMarketPlaceData = {
    wibuMarketPlaceAddress: wibuMarketPlace.address,
  };
  const wibuMarketPlaceJsonData = JSON.stringify(wibuMarketPlaceData, null, 2);
  fs.writeFileSync(wibuMarketPlaceFilePath, wibuMarketPlaceJsonData);

  console.log("Deployment completed. Data saved to respective JSON files.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
