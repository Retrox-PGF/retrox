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
    const badgeHolders = [addr1.address,addr2.address];

    await retro.createRound("round1", badgeHolders, {value:ethers.utils.parseEther("1000")});
    await retro.nominate(0,"nomination1", addr3.address, {value:ethers.utils.parseEther("0.5")});
    await retro.nominate(0,"nomination2", addr4.address, {value:ethers.utils.parseEther("0.5")});
    await retro.castVote(0,[50,50]);
    await retro.castVote(0,[20,80]);

    await retro.disperseFunds(0);
    const addr3WeiValue = await provider.getBalance(addr3.address)
    const addr3EthValue = ethers.utils.formatEther(addr3WeiValue);
    const addr4WeiValue = await provider.getBalance(addr4.address)
    const addr4EthValue = ethers.utils.formatEther(addr4WeiValue);
    const addr3ExpectedValue = ethers.utils.formatEther(BigInt(10423*(10**18)));
    const addr4ExpectedValue = ethers.utils.formatEther(BigInt(10576*(10**18)));

    const nom1 = await retro.getNominationData(0,0);
    const nom2 = await retro.getNominationData(0,1);
    const round1 = await retro.getRoundData(0);

    expect(addr3EthValue > (addr3ExpectedValue-2));
    expect(addr4EthValue > (addr4ExpectedValue-2));
  });
});