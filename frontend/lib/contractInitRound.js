import { ethers } from 'ethers'
import { deployed_address } from '../contract_config.js';

export async function contractInitRound(roundURI, badgeholders, nominationDuration, votingDuration, value){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const retroAddress = deployed_address
  const retroABI = [
    "function createRound(string memory roundURI, address votingStrategy, address dispersalStrategy, address[] memory badgeHolders, uint256 nominationDuration, uint256 votingDuration) public payable"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider)
  console.log(retroContract)
  await retroContract.connect(signer).createRound(roundURI, "0x7b5a805226be647427f309b65be8aee8374484ad", "0x7b5a805226be647427f309b65be8aee8374484ad", badgeholders, nominationDuration, votingDuration, {value:ethers.utils.parseEther(`${value}`)});
}
