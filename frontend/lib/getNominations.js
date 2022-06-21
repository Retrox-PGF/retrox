import { UserRejectedRequestError } from "@wagmi/core";
import { ethers } from "ethers"
import { deployed_address } from '../contract_config.js';
import { getRound } from "./getRounds.js";

const IPFS_REGEX = /ipfs:[/]{2}[0-9a-zA-Z]{46}/g

//function to convert uri from contract to URL which can be called to get JSON metadata
function uriToURL(uri) {
  return `https://ipfs.infura.io/ipfs/${uri.slice(7)}`
}

export async function getNominations(id, round) {
  console.log(id);

  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_URL);

  const retroAddress = deployed_address
  const retroABI = [
    "function getNominationData(uint256 roundNum, uint256 nominationNum) public view returns (string memory, address, uint256)",
    "function nominations(uint256, uint256) public view returns (string memory, address, uint256)"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider);

  if (!round) {
    console.log(`reloading round`)
    var { round, error }  = await getRound(id);
    if (error) {
      console.error(error);
    }
    console.log(round)
  }
  const nominationNum = round.nominationCounter

  let nominations = [];
  for (let i = 0; i < nominationNum; i++) {
    nominations.push(new Promise(async (resolve, reject) => {
      const nom = await retroContract.nominations(id, i);

      // check that ipfs URI is formatted properly
      const match = nom[0].match(IPFS_REGEX);
      if (!match) {
        reject("not a valid ipfs identifier")
      }

      const url = uriToURL(nom[0]);
      const res = await fetch(url);

      let body;
      try {
        body = await res.json()
      } catch (error) {
        reject(error)
      }

      resolve({
        nominationURI: nom[0],
        ...body,
        recipient: nom[1],
        numVotes: nom[2].toNumber()
      })
    }))

  }

  return await Promise.all(nominations);
}
