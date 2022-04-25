# RPGF - Retr0x

Retr0x implements a novel mechanism for funding public goods that add the most value to humanity. The core idea is to combine both retroactive and future (re-generative) funding of projects into a single protocol in a way that best incentivizes development of the work. We call this mechanism Retro-Generative Public Goods Funding. Once funding allocation has been decided, the retroactive part of the funding is delivered in a lump sum to the recipient whilst the re-generative funding is streamed continuously over a set period. The stream of funds can be cancelled at any time, ensuring that the recipients maintain their enthusiasm for their work well into the future. In this hackathon, we have built a first prototype for a DApp that implements the protocol. In brief, this consists of a smart contract that executes the voting and fund disbursement logic, a dashboard that accesses the on-chain data, and a Data Availability solution provided by IPFS. We utilise the Optimistic Rollup Optimism to provide reduced costs for on-chain logic without any security compromise in comparison to an implementation on the Ethereum mainnet. 
 
Our whitepaper is attached: /Retr0x.pdf

The app is running live on vercel: https://retr0x.vercel.app

This was a winning submission to the ETH-Global Hackathon in Amsterdam in 2022: https://showcase.ethglobal.com/ethamsterdam/retr0x-2p73o.
 
# Technical Documentation

The contract (retro.sol) which is at the heart of the scheme is found in retro/contracts/retro.sol 

To deploy the contract (private key needs to be added in retro/hardhat.config.js) :

```
yarn hardhat deploy
yarn hardhat run scripts/sample-scripts.js --network optimism-kovan
```

The frontend is a Next.js App and a readme is attached in /frontend
