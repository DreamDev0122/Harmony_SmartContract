const { expect, assert, waffle } = require("chai");
const { ethers } = require("hardhat");

describe("MTop NFT token", function () {
  let MTop, MTopNFTContract;
  let MTopToken, MTopTokenContract;

  beforeEach(async function () {
    [deployer, badActor, user1, user2, ...user] = await ethers.getSigners();

    MTopToken = await ethers.getContractFactory("MTopToken");
    MTopTokenContract = await MTopToken.deploy(deployer.address);
    await MTopTokenContract.deployed();

    MTopNFT = await ethers.getContractFactory("MTopNFT");
    MTopNFTContract = await MTopNFT.deploy(
      "https://ipfs.io/ipfs/NewURI",
      MTopTokenContract.address
    );
    await MTopNFTContract.deployed();

    await MTopNFTContract.setPause(false);
  });

  describe("Test Suite", function () {
    it("Should set the right owner", async function () {
      console.log("Owner Address:", deployer.address);
      expect(await MTopTokenContract.owner()).to.equal(deployer.address);
      expect(await MTopNFTContract.owner()).to.equal(deployer.address);
    });

    it("should work mint using MTopToken", async () => {
      const price = await MTopNFTContract.PRICE();

      console.log(String(await MTopTokenContract.balanceOf(deployer.address)));

      await MTopTokenContract.approve(MTopNFTContract.address, price);

      await MTopNFTContract.mint(1);

      console.log(String(await MTopTokenContract.balanceOf(deployer.address)));
    });
  });
});
