// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");

// comandline: npx hardhat test scripts/test.js --network sepolia

describe("NFTMarketplace", function () {
  const NFT_address = "0xcbCf38805b12C57F01CF5EE355bb9cFCa63BB9D4";
  const addres_recipient = "0xC77E5F3B7099bA3b3A4b20292d010696b97177fc";
  let nft_marketplace;
  let nft;
  let owner;
  beforeEach(async function () {
    nft_marketplace = await ethers.getContractFactory("NFTMarketplace");
    nft = await nft_marketplace.attach(NFT_address);
    [owner] = await ethers.getSigners();
  });
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      console.log("owner.address: ", owner.address);
      console.log("nft.get_owner().address: ", await nft.get_owner());
      expect(await nft.get_owner()).to.equal(owner.address);
    });
    it("create nft ", async function () {
      const link_nft = "https://token-uri-2.com";
      const pre_name_nft = 100000000;
      console.log("link nft: ", link_nft);
      console.log("pre_name_nft: ", pre_name_nft);
      const newTokenId = await nft.createToken(link_nft, pre_name_nft);
      console.log("newTokenId: ", newTokenId);
      const addressFilePath = "NFT_tokenid.txt";
      fs.writeFileSync(addressFilePath, newTokenId);
    });
    it("test some thing", async function () {
      console.log("nft.getListPrice():");
      console.log(nft.getListPrice());
    });
  });
});
