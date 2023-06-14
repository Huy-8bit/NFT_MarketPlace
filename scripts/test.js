// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { id } = require("ethers/lib/utils");

// comandline: npx hardhat test scripts/test.js --network sepolia

describe("NFTMarketplace", function () {
  const tokenAddress = "0x88F0c848e2D1e95aCb90a12dA82eb1bbE738a7A0";
  const NFT_address = "0x59627572dc94c3B24ab45D2D2f8434E50B87D76A";
  const NFTMarketPlace_address = "0xB1Ed067698a163BE18F7Ba7e11a0b61fD658Fd3D";
  const addres_recipient = "0xFd883589837bEEFf3dFdB97A821E0c71FF9BA20A";

  let WibuMarketPlace;
  let wibuMarketPlace;
  let owner;

  beforeEach(async function () {
    WibuMarketPlace = await ethers.getContractFactory("NFT_marketPlace");
    wibuMarketPlace = await WibuMarketPlace.attach(NFTMarketPlace_address);
    [owner] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      console.log("owner.address: ", owner.address);
      console.log("wibuMarketPlace.owner: ", await wibuMarketPlace.get_owner());
      expect(await wibuMarketPlace.get_owner()).to.equal(owner.address);
    });
    // it("create nft ", async function () {
    //   const link_nft =
    //     "https://wallpapers.com/images/high/sasuke-silhouette-4k-sqbl3rfuo2qpepuh.webp";
    //   const pre_name_nft = 1000;
    //   console.log("link nft: ", link_nft);
    //   console.log("pre_name_nft: ", pre_name_nft);
    //   const newToken = await wibuMarketPlace.createNft(link_nft, pre_name_nft);
    //   console.log("newToken: ", newToken);
    // });
    it("get all nft ", async function () {
      const allNFT = await wibuMarketPlace.getAllListedTokens();
      console.log("allNFT: ", allNFT);
    });

    // it("approve nft", async function () {
    //   const tokenId = 6;
    //   const WibuNFT = await ethers.getContractFactory("WibuNFT");
    //   const wibuNFT = await WibuNFT.attach(NFT_address);
    //   await wibuNFT.approve(NFTMarketPlace_address, tokenId);
    // });

    // it("buy nft ", async function () {
    //   const tokenId = 2;
    //   const WibuToken = await ethers.getContractFactory("WibuToken");
    //   const wibuToken = await WibuToken.attach(tokenAddress);
    //   await wibuToken.approve(NFTMarketPlace_address, 1000);
    //   const buyNFT = await wibuMarketPlace.buyNft(tokenId);

    //   console.log("buyNFT: ", buyNFT);
    // });

    // it("transfer nft", async function () {
    //   const tokenId = 2;
    //   const WibuNFT = await ethers.getContractFactory("WibuNFT");
    //   const wibuNFT = await WibuNFT.attach(NFT_address);
    //   await wibuNFT.approve(owner.address, tokenId);
    //   const transferNFT = await wibuNFT.transferNFT(addres_recipient, tokenId);
    // });
  });
});

// describe("WibuToken", function () {
//   // get the contract instance

//   let wibuToken;

//   let owner;
//   let addr1;
//   let addr2;
//   let addrs;
//   const addres_recipient = "0xFd883589837bEEFf3dFdB97A821E0c71FF9BA20A";
//   let tokenAddress = "0x88F0c848e2D1e95aCb90a12dA82eb1bbE738a7A0";

//   beforeEach(async function () {
//     const WibuToken = await ethers.getContractFactory("WibuToken");
//     wibuToken = await WibuToken.attach(tokenAddress);
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
//     console.log("wibu token address: ", wibuToken.address);
//   });

//   describe("Deployment", function () {
//     it("Should set the right owner", async function () {
//       expect(await wibuToken.owner()).to.equal(owner.address);
//       console.log("total supply: ", await wibuToken.totalSupply());
//     });
//   });

// describe("Transactions", function () {
//   it("transfer 20000000000 tokens from owner to addres_recipient", async function () {
//     console.log("owner: ", owner.address);
//     console.log("addres_recipient: ", addres_recipient);
//     console.log("before transfer");
//     console.log("owner balance: ", await wibuToken.balanceOf(owner.address));
//     console.log(
//       "addres_recipient balance: ",
//       await wibuToken.balanceOf(addres_recipient)
//     );
//     await wibuToken.transfer(addres_recipient, 20000000000);

//     console.log("after transfer");
//     console.log("owner balance: ", await wibuToken.balanceOf(owner.address));
//     console.log(
//       "addr1 balance: ",
//       await wibuToken.balanceOf(addres_recipient)
//     );
//     //   expect(await wibuToken.balanceOf(addres_recipient)).to.equal(1000);
//   });
// });
// });
