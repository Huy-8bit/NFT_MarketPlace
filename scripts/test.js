// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");

// comandline: npx hardhat test scripts/test.js --network sepolia

describe("NFTMarketplace", function () {
  const NFT_address = "0xeae6718cBb14af611C6a5eD08f89e1a03F4f1Fc7";
  const addres_recipient = "0xf30607e0cdEc7188d50d2bb384073bF1D5b02fA4";
  const tokenAddress = "0x406Fe49Dc9dBC10D9F2b603b135BdC62f281f0D7";
  let nft_marketplace;
  let nft;
  let owner;
  beforeEach(async function () {
    nft_marketplace = await ethers.getContractFactory("Wibu_NFTMarketplace");
    nft = await nft_marketplace.attach(NFT_address);
    [owner] = await ethers.getSigners();
  });
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      console.log("owner.address: ", owner.address);
      console.log("nft.get_owner().address: ", await nft.get_owner());
      console.log("nft.address: ", nft.address);
      // expect(await nft.get_owner()).to.equal(owner.address);
    });

    // it("create nft ", async function () {
    //   const link_nft =
    //     "https://wallpapers.com/images/hd/naruto-shippuden-jiraiya-cosplay-cgzhsbq4xok3cftb.webp";
    //   const pre_name_nft = 92000000;
    //   console.log("link nft: ", link_nft);
    //   console.log("pre_name_nft: ", pre_name_nft);
    //   const newToken = await nft.createToken(
    //     owner.address,
    //     link_nft,
    //     pre_name_nft,
    //     {
    //       value: ethers.utils.parseEther("0.01"),
    //     }
    //   );
    //   console.log("newToken: ", newToken);
    // });

    it("get all nft", async function () {
      const all_nft = await nft.getAllNFTs();
      console.log("all nft: ", all_nft);
    });

    // it("get my nft", async function () {
    //   const my_nft = await nft.getMyNFTs();
    //   console.log("my_nft: ", my_nft);
    // });

    describe("transfer nft", function () {
      it("check info from buy nft", async function () {
        const WibuToken = await ethers.getContractFactory("WibuToken");
        let wibuToken = await WibuToken.attach(tokenAddress);
        const balance = await wibuToken.balanceOf(owner.address);
        console.log("Số dư token của chủ sở hữu:", balance.toString());
      });
      it("transfer nft", async function () {
        const token_id = 2;
        await nft.executeSale(token_id, {
          value: ethers.utils.parseEther("0.01"),
        });
      });
      // it("transction nft", async function () {
      //   const token_id = 1;
      //   console.log("transction nft to ", addres_recipient);
      //   const transfer_nft = await nft.transction_nft(
      //     nft.address,
      //     addres_recipient,
      //     token_id
      //   );
      // });
      // it("buy nft", async function () {
      //   const token_id = 2;
      //   console.log("token_id: ", token_id);
      //   console.log("address buy nft: ", owner.address);
      //   await nft.executeSale(token_id);
      // });
    });
  });
});
