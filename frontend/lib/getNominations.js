import { ethers } from "ethers"
import { deployed_address } from '../contract_config.js';

const IPFS_REGEX = /ipfs:[/]{2}[0-9a-zA-Z]{46}/g

//function to convert uri from contract to URL which can be called to get JSON metadata
function uriToURL(uri) {
  return `https://ipfs.infura.io/ipfs/${uri.slice(7)}`
}

export async function getNominations(id) {
  console.log(id);

  const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

  const retroAddress = deployed_address
  const retroABI = [
    "function getNominationData(uint256 roundNum, uint256 nominationNum) public view returns (string memory, address, uint256)",
    "function getRoundData(uint256 roundNum) public view returns(string memory, uint256, uint256, uint256, uint256)"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider);
  const nominationNum = (await retroContract.getRoundData(id))[3].toNumber();

  let nominations = [];
  for (let i = 0; i < nominationNum; i++) {
    const nom = await retroContract.getNominationData(id, i);

    // check that ipfs URI is formatted properly
    const match = nom[0].match(IPFS_REGEX);
    if (!match) {
      continue;
    }

    const url = uriToURL(nom[0]);
    const res = await fetch(url);

    let body;
    try {
      body = await res.json()
    } catch (error) {
      console.error(error)
    }

    nominations.push({
      nominationURI: nom[0],
      ...body,
      recipient: nom[1],
      numVotes: nom[2].toNumber()
    })
  }

  return nominations;
}