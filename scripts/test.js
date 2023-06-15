// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { id } = require("ethers/lib/utils");

// comandline: npx hardhat test scripts/test.js --network sepolia

const wibuMarketPlaceFilePath = "./deployment/wibuMarketPlace.json";
const nftFilePath = "./deployment/nft.json";
const wibuTokenFilePath = "./deployment/wibuToken.json";

// Đọc dữ liệu từ tệp JSON của WibuMarketPlace
const wibuMarketPlaceJsonData = fs.readFileSync(
  wibuMarketPlaceFilePath,
  "utf-8"
);
const wibuMarketPlaceData = JSON.parse(wibuMarketPlaceJsonData);
const wibuMarketPlaceAddress = wibuMarketPlaceData.wibuMarketPlaceAddress;

// Đọc dữ liệu từ tệp JSON của NFT
const nftJsonData = fs.readFileSync(nftFilePath, "utf-8");
const nftData = JSON.parse(nftJsonData);
const NFTAddress = nftData.NFTAddress;

// Đọc dữ liệu từ tệp JSON của WibuToken
const wibuTokenJsonData = fs.readFileSync(wibuTokenFilePath, "utf-8");
const wibuTokenData = JSON.parse(wibuTokenJsonData);
const tokenAddress = wibuTokenData.tokenAddress;

// Sử dụng giá trị của các biến
console.log("tokenAddress:", tokenAddress);
console.log("NFTAddress:", NFTAddress);
console.log("wibuMarketPlaceAddress:", wibuMarketPlaceAddress);

const addres_recipient = "0xFd883589837bEEFf3dFdB97A821E0c71FF9BA20A";

describe("NFTMarketplace", function () {
  let WibuMarketPlace;
  let wibuMarketPlace;
  let owner;

  beforeEach(async function () {
    WibuMarketPlace = await ethers.getContractFactory("NFT_marketPlace");
    wibuMarketPlace = await WibuMarketPlace.attach(wibuMarketPlaceAddress);
    WibuNFT = await ethers.getContractFactory("WibuNFT");
    wibuNFT = await WibuNFT.attach(NFTAddress);
    [owner] = await ethers.getSigners();
  });

  describe("create nft", function () {
    // it("create nft 1 ", async function () {
    //   const link_nft =
    //     "https://wallpapers.com/images/high/sasuke-silhouette-4k-sqbl3rfuo2qpepuh.webp";
    //   console.log("link nft: ", link_nft);
    //   const newToken = await wibuNFT.createNFT(link_nft);
    //   console.log("newToken: ", newToken);
    // });
    // it("create nft 2 ", async function () {
    //   const link_nft =
    //     "https://wallpapers.com/images/high/sasuke-black-suit-4k-ofm5xplapuoiprp8.webp";
    //   console.log("link nft: ", link_nft);
    //   const newToken = await wibuNFT.createNFT(link_nft);
    //   console.log("newToken: ", newToken);
    // });
    // it("create nft 3", async function () {
    //   const link_nft =
    //     "https://wallpapers.com/images/high/sasuke-red-mark-4k-vq1e5g8c79on6j6n.webp";
    //   console.log("link nft: ", link_nft);
    //   const newToken = await wibuNFT.createNFT(link_nft);
    //   console.log("newToken: ", newToken);
    // });
    // it("create nft 4", async function () {
    //   const link_nft =
    //     "https://wallpapers.com/images/high/sasuke-lying-on-the-ground-4k-5cg6ronsv6b71c4d.webp";
    //   console.log("link nft: ", link_nft);
    //   const newToken = await wibuNFT.createNFT(link_nft);
    //   console.log("newToken: ", newToken);
    // });
    // it("create nft 5", async function () {
    //   const link_nft =
    //     "https://wallpapers.com/images/high/sasuke-black-4k-d3ak6v5zqruafeji.webp";
    //   console.log("link nft: ", link_nft);
    //   const newToken = await wibuNFT.createNFT(link_nft);
    //   console.log("newToken: ", newToken);
    // });
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      console.log("wibuMarketPlace.address: ", wibuMarketPlace.address);
      console.log("owner.address: ", owner.address);
      console.log("wibuMarketPlace.owner: ", await wibuMarketPlace.get_owner());
      expect(await wibuMarketPlace.get_owner()).to.equal(owner.address);
    });

    // it("listed nft 1", async function () {
    //   const tokenId = 1;
    //   const price = 700000000;
    //   const listedNFT = await wibuMarketPlace.ListedNFT(tokenId, price);
    //   console.log("listedNFT: ", listedNFT);
    // });
    // it("listed nft 2", async function () {
    //   const tokenId = 2;
    //   const price = 850000000;
    //   const listedNFT = await wibuMarketPlace.ListedNFT(tokenId, price);
    //   console.log("listedNFT: ", listedNFT);
    // });
    // it("listed nft 3", async function () {
    //   const tokenId = 3;
    //   const price = 11000000000;
    //   const listedNFT = await wibuMarketPlace.ListedNFT(tokenId, price);
    //   console.log("listedNFT: ", listedNFT);
    // });
    // it("listed nft 4", async function () {
    //   const tokenId = 4;
    //   const price = 250000000;
    //   const listedNFT = await wibuMarketPlace.ListedNFT(tokenId, price);
    //   console.log("listedNFT: ", listedNFT);
    // });
    // it("listed nft 5", async function () {
    //   const tokenId = 5;
    //   const price = 900000000;
    //   const listedNFT = await wibuMarketPlace.ListedNFT(tokenId, price);
    //   console.log("listedNFT: ", listedNFT);
    // });

    // it("get NFT uri", async function () {
    //   const tokenId = 1;
    //   const uri = await wibuNFT.getNFTURI(tokenId);
    //   console.log("uri: ", uri);
    // });

    // it("get all nft ", async function () {
    //   const allNFT = await wibuMarketPlace.getAllNFTs();
    //   console.log("allNFT: ", allNFT);
    // });

    it("get all my nft ", async function () {
      const allMyNFT = await wibuNFT.getAllMyNft();
      console.log("ALl my nft: ");
      for (let i = 0; i < allMyNFT.length; i++) {
        if (allMyNFT[i] != 0) {
          console.log("NftID: ", allMyNFT[i]);
        }
      }
    });

    // it("get All Listed Tokens", async function () {
    //   const allListedTokens = await wibuMarketPlace.getAllListedTokens();
    //   for (let i = 0; i < allListedTokens.length; i++) {
    //     if (
    //       allListedTokens[i].owner !=
    //       "0x0000000000000000000000000000000000000000"
    //     ) {
    //       console.log(allListedTokens[i]);
    //     }
    //   }
    // });

    // it(" Edit price nft ", async function () {
    //   const tokenId = 5;
    //   const price = 340000000;
    //   const editPriceNFT = await wibuMarketPlace.editPriceNft(tokenId, price);
    //   console.log("editPriceNFT: ", editPriceNFT);
    // });

    // it("approve nft", async function () {
    //   const tokenIds = [5];
    //   const WibuNFT = await ethers.getContractFactory("WibuNFT");
    //   const wibuNFT = await WibuNFT.attach(NFTAddress);
    //   for (let i = 0; i < tokenIds.length; i++) {
    //     await wibuNFT.approve(wibuMarketPlaceAddress, tokenIds[i]);
    //   }
    // });

    // it("buy nft ", async function () {
    //   const tokenId = 2;
    //   const NftBuyInfo = await wibuMarketPlace.getListedTokenForId(tokenId);
    //   const WibuToken = await ethers.getContractFactory("WibuToken");
    //   const wibuToken = await WibuToken.attach(tokenAddress);
    //   await wibuToken.approve(wibuMarketPlaceAddress, NftBuyInfo.price);
    //   const buyNFT = await wibuMarketPlace.buyNft(tokenId);
    //   console.log("buyNFT: ", buyNFT);
    // });
    // it("currentlyListedMyNFTs", async function () {
    //   const listCurrentlyListedMyNFTs = [2];
    //   const currentlyListedMyNFTs = await wibuMarketPlace.currentlyListedMyNFT(
    //     listCurrentlyListedMyNFTs
    //   );
    //   console.log("currentlyListedMyNFTs: ", currentlyListedMyNFTs);
    // });
    // it("transfer nft", async function () {
    //   const tokenId = 2;
    //   const WibuNFT = await ethers.getContractFactory("WibuNFT");
    //   const wibuNFT = await WibuNFT.attach(NFTAddress);
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

//   describe("Transactions", function () {
//     it("transfer 20000000000 tokens from owner to addres_recipient", async function () {
//       console.log("owner: ", owner.address);
//       console.log("addres_recipient: ", addres_recipient);
//       console.log("before transfer");
//       console.log("owner balance: ", await wibuToken.balanceOf(owner.address));
//       console.log(
//         "addres_recipient balance: ",
//         await wibuToken.balanceOf(addres_recipient)
//       );
//       await wibuToken.transfer(addres_recipient, 20000000000);

//       console.log("after transfer");
//       console.log("owner balance: ", await wibuToken.balanceOf(owner.address));
//       console.log(
//         "addr1 balance: ",
//         await wibuToken.balanceOf(addres_recipient)
//       );
//     });
//   });
// });
