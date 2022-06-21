import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';
import { contractInitNomination } from '../lib/contractInitNomination';
import { deployed_address } from '../contract_config.js';
const optimismNominations = require('../data/optimismNominations.json');

const privateKey = "4a18c46e401a3ef8495cbe8e9b43620827eb116f8d7e3f9e511c0685078d4a98";
const infura = "https://optimism-kovan.infura.io/v3/dd3f65755141452db7b13a0632caddd3";
const address = "0xf0d9A38494b40b72dcd7A5CA109fd59d80b88337"

export async function loopOverData(roundNum) {
  const ipfs = create({
    url: 'https://ipfs.infura.io:5001/api/v0',
  });
  const provider = new ethers.providers.JsonRpcProvider(infura);
  const signer = new ethers.Wallet(privateKey, provider)
  const retroAddress = deployed_address;
  const retroABI = [
    "function nominate(uint256 roundNum, string memory nominationURI, address recipient) public payable"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, signer)
  optimismNominations.forEach(async (el) => {
    if (el.id < 4) {
      const res = await ipfs.add(JSON.stringify({
        nominatorName: el.nominatorName,
        projectName: el.projectName,
        projectURL: el.projectURL,
        projectLeadName: el.projectLeadName,
        rationale: el.rationale
      }));
      const ipfsURI = `ipfs://${res.path}`;
      const intNonce = await provider.getTransactionCount(address, 'pending');
      console.log(intNonce)
      const nonce = ethers.utils.hexlify(intNonce + el.id - 1);
      const tx = await retroContract.nominate(roundNum, ipfsURI, "0x0000000000000000000000000000000000000000", {value:ethers.utils.parseEther("0.01"), nonce: nonce});
      tx.wait();
      console.log('done')
    }
  })
}
