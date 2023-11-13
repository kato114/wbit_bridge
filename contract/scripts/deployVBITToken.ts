import { ethers } from "hardhat";

async function main() {
  const VBITToken = await ethers.getContractFactory("VBITToken");
  const vbittoken = await VBITToken.deploy();

  await vbittoken.deployed();

  console.log(`Deployed to ${vbittoken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
