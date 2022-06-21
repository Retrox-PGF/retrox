import { deployed_address } from '../contract_config.js';
import { ethers } from 'ethers';

export async function contractInitBadgeholder(roundID, badgeAddress) {
  const retroAddress = deployed_address;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const retroABI = [
    "function badgeHolderVoteStatus(uint256, address) public view returns (uint256)"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider);
  console.log(provider)
  return await retroContract.badgeHolderVoteStatus(roundID, badgeAddress);
}
