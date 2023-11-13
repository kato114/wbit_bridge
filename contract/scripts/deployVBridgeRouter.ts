import { ethers, upgrades } from "hardhat";

async function main() {
  const WNativeToken = "0x9Bf843B1BA38edd1D737D0728f1B999E984Fa3fc";

  const VBridgeRouter = await ethers.getContractFactory("VBridgeRouter");
  const vbridgerouter = await upgrades.deployProxy(VBridgeRouter, [
    WNativeToken,
  ]);
  // const vbridgerouter = await VBridgeRouter.deploy(WNativeToken);

  await vbridgerouter.deployed();

  console.log(`Deployed to ${vbridgerouter.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
