// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");

// comandline: npx hardhat test scripts/test.js --network sepolia

describe("NFTMarketplace", function () {
  const NFT_address = "0xF5df9D64Bc017d85615eDaDc9A529Ce0F0149f3a";
  const addres_recipient = "0xC77E5F3B7099bA3b3A4b20292d010696b97177fc";
  const tokenAddress = "0x3837e290fe5dF1222177f7478221A9E34fFAb6F8";
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

    it("create nft ", async function () {
      const link_nft =
        "https://wallpapers.com/images/hd/naruto-shippuden-jiraiya-cosplay-cgzhsbq4xok3cftb.webp";
      const pre_name_nft = 45000000;
      console.log("link nft: ", link_nft);
      console.log("pre_name_nft: ", pre_name_nft);
      const newToken = await nft.createToken(
        owner.address,
        link_nft,
        pre_name_nft,
        {
          value: ethers.utils.parseEther("0.01"),
        }
      );
      console.log("newToken: ", newToken);
    });

    // it("get all nft", async function () {
    //   const all_nft = await nft.getAllNFTs();
    //   console.log("all nft: ", all_nft);
    // });

    // it("get my nft", async function () {
    //   const my_nft = await nft.getMyNFTs();
    //   console.log("my_nft: ", my_nft);
    // });

    // describe("transfer nft", function () {
    //   it("check info from buy nft", async function () {
    //     const WibuToken = await ethers.getContractFactory("WibuToken");
    //     let wibuToken = await WibuToken.attach(tokenAddress);
    //     const balance = await wibuToken.balanceOf(owner.address);
    //     console.log("Số dư token của chủ sở hữu:", balance.toString());
    //   });
    //   it("transfer nft", async function () {
    //     const token_id = 2;
    //     await nft.executeSale(token_id, {
    //       value: ethers.utils.parseEther("0.01"),
    //     });
    //   });
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
    // });
  });
});
