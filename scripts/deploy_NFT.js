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

  const NFT = await ethers.getContractFactory("Wibu_NFTMarketplace");
  const nft = await NFT.deploy("0x406Fe49Dc9dBC10D9F2b603b135BdC62f281f0D7");

  console.log("NFT address: ", nft.address);

  const addressFilePath = "NFT_address.txt";
  fs.writeFileSync(addressFilePath, nft.address);

  // create a firt nft
  const link_nft =
    "https://wallpapers.com/images/hd/naruto-and-hinata-family-tlkdtcjddxghdv7b.webp";
  const pre_name_nft = 500000000;
  console.log("link nft: ", link_nft);
  console.log("pre_name_nft: ", pre_name_nft);
  const createTokenTx = await nft.createToken(
    deployer.address,
    link_nft,
    pre_name_nft,
    {
      value: ethers.utils.parseEther("0.01"),
    }
  );
  console.log("createTokenTx: ", createTokenTx);

  const addressFilePath2 = "NFT_tokenid.txt";
  fs.appendFileSync(addressFilePath2, createTokenTx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
