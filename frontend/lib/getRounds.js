import { ethers } from "ethers"
import { deployed_address } from '../contract_config.js';

const IPFS_REGEX = /ipfs:[/]{2}[0-9a-zA-Z]{46}/g
const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_URL);
const retroAddress = deployed_address;
const retroABI = [
  "function getNextRoundNum() public view returns (uint256)",
  "function getRoundData(uint256 roundNum) public view returns(string memory, uint256, uint256, uint256, uint256, uint256, uint256)"
]
const retroContract = new ethers.Contract(retroAddress, retroABI, provider);


//function to convert uri from contract to URL which can be called to get JSON metadata
function uriToURL(uri) {
  return `https://ipfs.infura.io/ipfs/${uri.slice(7)}`
}

export async function getRound(id) {
  const round = await retroContract.getRoundData(id);

  // check that ipfs URI is formatted properly
  const match = round[0].match(IPFS_REGEX);
  if (!match) {
    return { error: "invalid ipfs uri" };
  }

  const url = uriToURL(round[0]);
  const res = await fetch(url);

  let body;
  try {
    body = await res.json()
  } catch (error) {
    console.error(error)
    return { error }
  }

  console.log(round);

  return {
    round: {
      roundURI: round[0],
      ...body,
      startBlockTimestamp: round[1].toNumber(),
      fundsCommitted: ethers.utils.formatEther(round[2]),
      nominationCounter: round[3].toNumber(),
      totalVotes: round[4].toNumber(),
      nominationDuration: round[5].toNumber(),
      votingDuration: round[6].toNumber()
    }
  }
}

export async function getRounds() {

  const numRounds = (await retroContract.getNextRoundNum()).toNumber();

  let rounds = []
  for (let i = 0; i <= numRounds; i++) {
    const { round, error } = await getRound(i);

    if (error) {
      continue;
    }

    rounds.push(round)
  }

  return rounds;
}
