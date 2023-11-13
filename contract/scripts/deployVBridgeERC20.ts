import { ethers } from "hardhat";

async function main() {
  const tokenName = "VBridge WVBIT";
  const tokenSymbol = "VB_WVBIT";
  const decimal = 18;
  const orgToken = "0x9Bf843B1BA38edd1D737D0728f1B999E984Fa3fc";

  const chainRouter = "0xEADD49d4e29df99dB37B10C4005F3EEEa515D182";

  const VBridgeERC20 = await ethers.getContractFactory("VBridgeERC20");
  const bridgeerc20 = await VBridgeERC20.deploy(
    tokenName,
    tokenSymbol,
    decimal,
    orgToken
  );

  await bridgeerc20.deployed();
  await bridgeerc20.init(chainRouter);

  console.log(`Deployed to ${bridgeerc20.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
