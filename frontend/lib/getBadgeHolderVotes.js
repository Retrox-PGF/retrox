import { ethers } from "ethers"
import { deployed_address } from '../contract_config.js';
import { getRound } from "./getRounds.js";

const IPFS_REGEX = /ipfs:[/]{2}[0-9a-zA-Z]{46}/g

//function to convert uri from contract to URL which can be called to get JSON metadata
function uriToURL(uri) {
  return `https://ipfs.infura.io/ipfs/${uri.slice(7)}`
}

export async function getBadgeHolderVotes(id, round) {
  console.log(id);

  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_URL);

  const retroAddress = deployed_address
  const retroABI = [
    "function badgeHolderVotes(address, uint256, uint256) public view returns (uint256)",
    "function getRoundData(uint256 roundNum) public view returns(string memory, uint256, uint256, uint256, uint256)",
    "function getNominationData(uint256 roundNum, uint256 nominationNum) public view returns (string memory, address, uint256)"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider);

  if (!round) {
    var { round } = await getRound(id);
  }
  console.log(`roundData: ${JSON.stringify(round, null, 2)}`)
  const nominationNum = round.nominationCounter;

  // check that ipfs URI is formatted properly
  const match = round.roundURI.match(IPFS_REGEX);

  const url = uriToURL(round.roundURI);
  const res = await fetch(url);

  let body;
  try {
    body = await res.json()
  } catch (error) {
    console.error(error)
  }

  console.log(body);

  let badgeHolderVotes = []
  for (let i = 0; i < nominationNum; i++) {
      badgeHolderVotes.push({});
      for (let j = 0; j < body.badgeholders.length; j++) {
        let badgeHolderAddress = body.badgeholders[j].address;
        let badgeHolderTwitter = body.badgeholders[j].twitter;
        let badgeHolderVote = await retroContract.badgeHolderVotes(badgeHolderAddress, id, i);
        badgeHolderVotes[i][badgeHolderTwitter] = badgeHolderVote.toNumber();
      }
  }
  console.log("badgeholder votes", badgeHolderVotes);
  return badgeHolderVotes;
}
