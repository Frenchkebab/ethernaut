# Ethernaut

## Set up repo

### 1. Clone the repo

`git clone https://github.com/Frenchkebab/ethernaut.git`

### 2. Install npm dependencies

`npm install`

### 3. make .env file

`touch .env`

```
ETHERSCAN_API_KEY=ABC123ABC123ABC123ABC123ABC123ABC1
RINKEBY_URL=https://eth-ropsten.alchemyapi.io/v2/<YOUR ALCHEMY KEY>
PRIVATE_KEY=0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1
```

## Ethernaut 04 - CoinFlip

### Using Remix IDE

You can manualy deploy `contracts/03-CoinFlip/AttackCoinFlip.sol` from Remix IDE and call `attack()` manually 10 times.

### Using Hardhat Script

`scripts/03-CoinFlip/coinFlip.js`

`hardhat run scripts/03-CoinFlip/coinFlip.js --network rinkeby`

The script deploys `AttackCoinFlip.sol` first.

And it calls `AttackCoinFlip.attack()` function when a new block has been mined.
(The Script checks if a new block has been mined every two seconds)

⚠️ This has a bug showing same `wins` figure due to the delay of the `consecutiveWins` state variable update
