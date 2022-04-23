const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Retro", function () {
  it("should deploy", async function () {
    const Retro = await ethers.getContractFactory("Retro");
    const retro = await Retro.deploy();
    await retro.deployed();

  });
});