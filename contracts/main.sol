// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "hardhat/console.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "./WibuToken.sol";

// contract WibuNFT is Ownable {
//     uint256 private cap = 100000000000;
//     struct NFT {
//         uint256 tokenId;
//         address owner;
//         string linkNFT;
//     }

//     mapping(uint256 => NFT) private nfts;
//     uint256 private nextTokenId = 1;

//     event NFTMinted(
//         uint256 indexed tokenId,
//         address indexed owner,
//         string linkNFT
//     );
//     event NFTTransferred(
//         uint256 indexed tokenId,
//         address indexed from,
//         address indexed to
//     );

//     function mintNFT(
//         string memory _linkNFT
//     ) public onlyOwner returns (uint256) {
//         require(nextTokenId < cap, "WibuNFT: cap exceeded");

//         NFT storage newNFT = nfts[nextTokenId];
//         newNFT.tokenId = nextTokenId;
//         newNFT.owner = msg.sender;
//         newNFT.linkNFT = _linkNFT;

//         emit NFTMinted(nextTokenId, msg.sender, _linkNFT);
//         nextTokenId++;

//         return newNFT.tokenId;
//     }

//     function transferNFT(uint256 tokenId, address to) public {
//         require(msg.sender == nfts[tokenId].owner, "WibuNFT: not the owner");

//         nfts[tokenId].owner = to;
//         emit NFTTransferred(tokenId, msg.sender, to);
//     }

//     function ownerOf(uint256 tokenId) public view returns (address) {
//         return nfts[tokenId].owner;
//     }
// }

// contract WibuMarketplace {
//     struct NFTListing {
//         uint256 tokenId;
//         address seller;
//         uint256 price;
//         bool active;
//     }

//     WibuNFT private wibuNFT;
//     WibuToken private wibuToken;
//     mapping(uint256 => NFTListing) private listings;
//     uint256 private nextListingId = 1;

//     event NFTListed(
//         uint256 indexed listingId,
//         uint256 indexed tokenId,
//         address indexed seller,
//         uint256 price
//     );
//     event NFTSold(
//         uint256 indexed listingId,
//         uint256 indexed tokenId,
//         address indexed seller,
//         address buyer,
//         uint256 price
//     );

//     constructor(address _wibuNFTAddress, address _wibuTokenAddress) {
//         wibuNFT = WibuNFT(_wibuNFTAddress);
//         wibuToken = WibuToken(_wibuTokenAddress);
//     }

//     function listNFTForSale(uint256 tokenId, uint256 price) public {
//         listings[nextListingId] = NFTListing(tokenId, msg.sender, price, true);
//         emit NFTListed(nextListingId, tokenId, msg.sender, price);
//         nextListingId++;
//     }

//     function createNFT(
//         string memory _linkNFT,
//         uint256 _price
//     ) public returns (uint256) {
//         uint256 tokenId = wibuNFT.mintNFT(_linkNFT);
//         listNFTForSale(tokenId, _price);
//         return tokenId;
//     }

//     function buyNFT(uint256 listingId) public {
//         NFTListing storage listing = listings[listingId];
//         require(listing.active, "WibuMarketplace: listing is not active");

//         address seller = listing.seller;
//         uint256 price = listing.price;
//         uint256 tokenId = listing.tokenId;

//         require(
//             wibuToken.balanceOf(msg.sender) >= price,
//             "WibuMarketplace: insufficient balance"
//         );

//         wibuToken.transferFrom(msg.sender, seller, price);
//         wibuNFT.transferNFT(tokenId, msg.sender);

//         delete listings[listingId];
//         emit NFTSold(listingId, tokenId, seller, msg.sender, price);
//     }

//     function transferNFT(uint256 listingId, address to) public {
//         NFTListing storage listing = listings[listingId];
//         require(listing.active, "WibuMarketplace: listing is not active");

//         address seller = listing.seller;
//         uint256 tokenId = listing.tokenId;

//         require(
//             msg.sender == seller,
//             "WibuMarketplace: not the owner of the listing"
//         );

//         wibuNFT.transferNFT(tokenId, to);

//         delete listings[listingId];
//         emit NFTSold(listingId, tokenId, seller, to, 0);
//     }
// }
