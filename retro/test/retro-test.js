const { expect } = require("chai");
const { ethers,waffle } = require("hardhat");

describe("Retro", function () {
  it("should deploy", async function () {
    const Retro = await ethers.getContractFactory("Retro");
    const retro = await Retro.deploy();
    await retro.deployed();

  });

  it("should create a round", async function () {
    const provider = waffle.provider;
    const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    const Retro = await ethers.getContractFactory("Retro");
    const retro = await Retro.deploy();
    await retro.deployed();
    const badgeHolders = [addr1,addr2];
    retro.createRound("",badgeHolders,BigInt(10000*(10**18)));
    retro.nominate(0,"nomination1", addr3);
    retro.nominate(0,"nomination2", addr4);
    retro.castVote(0,[50,50]);

    retro.disperseFunds(0);
    const weiValue = await provider.getBalance(addr3.address)
    const ethValue = ethers.utils.formatEther(weiValue);
    const expectedValue = ethers.utils.formatEther(BigInt(10000*(10**18)));
    expect(ethValue).to.equal(expectedValue);
  });
});