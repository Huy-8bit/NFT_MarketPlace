// test nft marketplace

const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { id } = require("ethers/lib/utils");

// comandline: npx hardhat test scripts/test.js --network sepolia

const wibuMarketPlaceFilePath = "./deployment/wibuMarketPlace.json";
const nftFilePath = "./deployment/nft.json";
const wibuTokenFilePath = "./deployment/wibuToken.json";

// Read data from WibuMarketPlace JSON file
const wibuMarketPlaceJsonData = fs.readFileSync(
    wibuMarketPlaceFilePath,
    "utf-8"
);
const wibuMarketPlaceData = JSON.parse(wibuMarketPlaceJsonData);
const wibuMarketPlaceAddress = wibuMarketPlaceData.wibuMarketPlaceAddress;

// Read data from an NFT . JSON file
const nftJsonData = fs.readFileSync(nftFilePath, "utf-8");
const nftData = JSON.parse(nftJsonData);
const NFTAddress = nftData.NFTAddress;

// Read data from WibuToken's JSON file
const wibuTokenJsonData = fs.readFileSync(wibuTokenFilePath, "utf-8");
const wibuTokenData = JSON.parse(wibuTokenJsonData);
const tokenAddress = wibuTokenData.tokenAddress;

// Using values of variables
console.log("tokenAddress:", tokenAddress);
console.log("NFTAddress:", NFTAddress);
console.log("wibuMarketPlaceAddress:", wibuMarketPlaceAddress);

const addres_recipient = "0xFd883589837bEEFf3dFdB97A821E0c71FF9BA20A";

describe("NFTMarketplace", function() {
    let WibuMarketPlace;
    let wibuMarketPlace;
    let owner;

    beforeEach(async function() {
        WibuMarketPlace = await ethers.getContractFactory("NFT_marketPlace");
        wibuMarketPlace = await WibuMarketPlace.attach(wibuMarketPlaceAddress);
        WibuNFT = await ethers.getContractFactory("WibuNFT");
        wibuNFT = await WibuNFT.attach(NFTAddress);
        [owner] = await ethers.getSigners();
    });

    // describe("create nft", function () {
    //   it("create nft new ", async function () {
    //     const link_nft =
    //       "https://wallpapers.com/images/high/sasuke-silhouette-4k-sqbl3rfuo2qpepuh.webp";
    //     console.log("link nft: ", link_nft);
    //     const newToken = await wibuNFT.createNFT(link_nft);
    //     console.log("newToken: ", newToken);
    //   });
    // });

    describe("Deployment", function() {
        it("Should set the right owner", async function() {
            console.log("wibuMarketPlace.address: ", wibuMarketPlace.address);
            console.log("owner.address: ", owner.address);
            console.log("wibuMarketPlace.owner: ", await wibuMarketPlace.get_owner());
            expect(await wibuMarketPlace.get_owner()).to.equal(owner.address);
        });

        // it("listed nft new", async function() {
        //     const tokenId = 2;
        //     const price = 10000000000;
        //     const listedNFT = await wibuMarketPlace.ListedNFT(tokenId, price);
        //     console.log("listedNFT: ", listedNFT);
        // });

        // it("get all my nft ", async function() {
        //     const allMyNFT = await wibuNFT.getAllMyNft();
        //     console.log("ALl my nft: ");
        //     for (let i = 0; i < allMyNFT.length; i++) {
        //         if (allMyNFT[i] != 0) {
        //             console.log("NftID: ", allMyNFT[i]);
        //         }
        //     }
        // });
        // it("get NFT uri", async function () {
        //   const tokenId = 5;
        //   const uri = await wibuNFT.getNFTURI(tokenId);
        //   console.log("uri: ", uri);
        // });

        it("get all market nft ", async function() {
            const allNFT = await wibuMarketPlace.getAllNFTs();
            for (let i = 0; i < allNFT.length; i++) {
                if (allNFT[i].owner != "0x0000000000000000000000000000000000000000") {
                    console.log(allNFT[i]);
                }
            }
        });

        // it("get All Listed Tokens", async function() {
        //     const allListedTokens = await wibuMarketPlace.getAllListedTokens();
        //     for (let i = 0; i < allListedTokens.length; i++) {
        //         if (
        //             allListedTokens[i].owner !=
        //             "0x0000000000000000000000000000000000000000"
        //         ) {
        //             console.log(allListedTokens[i]);
        //         }
        //     }
        // });

        // it(" Edit price nft ", async function () {
        //   const tokenId = 1;
        //   const price = 9000000000;
        //   const editPriceNFT = await wibuMarketPlace.editPriceNft(tokenId, price);
        //   console.log("editPriceNFT: ", editPriceNFT);
        // });
        // it("approve nft", async function() {
        //     const tokenIds = [5];
        //     const WibuNFT = await ethers.getContractFactory("WibuNFT");
        //     const wibuNFT = await WibuNFT.attach(NFTAddress);
        //     for (let i = 0; i < tokenIds.length; i++) {
        //         await wibuNFT.approve(wibuMarketPlaceAddress, tokenIds[i]);
        //     }
        // });

        // it("buy nft ", async function() {
        //     const tokenId = 2;
        //     const NftBuyInfo = await wibuMarketPlace.getListedTokenForId(tokenId);
        //     const WibuToken = await ethers.getContractFactory("WibuToken");
        //     const wibuToken = await WibuToken.attach(tokenAddress);
        //     await wibuToken.approve(wibuMarketPlaceAddress, NftBuyInfo.price);
        //     const buyNFT = await wibuMarketPlace.buyNft(tokenId);
        //     console.log("buyNFT: ", buyNFT);
        // });

        // it("delete NFT in market", async function () {
        //   const listCurrentlyListedMyNFTs = 5;
        //   const currentlyListedMyNFTs = await wibuMarketPlace.removeFromMarket(
        //     listCurrentlyListedMyNFTs
        //   );
        //   console.log("currentlyListedMyNFTs: ", currentlyListedMyNFTs);
        // });
    });
});