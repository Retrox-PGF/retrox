import { ethers } from "ethers"
import { deployed_address } from '../contract_config.js';

const IPFS_REGEX = /ipfs:[/]{2}[0-9a-zA-Z]{46}/g

//function to convert uri from contract to URL which can be called to get JSON metadata
function uriToURL(uri) {
  return `https://ipfs.infura.io/ipfs/${uri.slice(7)}`
}


export async function getRounds() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

  const retroAddress = deployed_address
  const retroABI = [
    "function getNextRoundNum() public view returns (uint256)",
    "function getRoundData(uint256 roundNum) public view returns(string memory, uint256, uint256, uint256, uint256, uint256, uint256)"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider);

  const numRounds = (await retroContract.getNextRoundNum()).toNumber();

  let rounds = []
  for (let i = 0; i <= numRounds; i++) {
    const round = await retroContract.getRoundData(i);

    // check that ipfs URI is formatted properly
    const match = round[0].match(IPFS_REGEX);
    if (!match) {
      continue;
    }

    const url = uriToURL(round[0]);
    const res = await fetch(url);

    let body;
    try {
      body = await res.json()
    } catch (error) {
      console.error(error)
    }

    console.log(round);

    rounds.push({
      roundURI: round[0],
      ...body,
      startBlockTimestamp: round[1].toNumber(),
      fundsCommitted: ethers.utils.formatEther(round[2]),
      nominationCounter: round[3].toNumber(),
      totalVotes: round[4].toNumber(),
      nominationDuration: round[5].toNumber(),
      votingDuration: round[6].toNumber()
    })
  }

  return rounds;
}