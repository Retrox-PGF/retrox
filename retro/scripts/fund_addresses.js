// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

    const [owner] = await ethers.getSigners();
    
    // await owner.sendTransaction({
    //     to: "0xf7564713DBD6f9709eb41004d1461b3e3933CAFF",
    //     value: ethers.utils.parseEther("0.1"), // Sends exactly 1.0 ether
    //   });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });