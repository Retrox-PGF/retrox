import { ethers } from 'ethers';
import { deployed_address } from '../contract_config.js';

export async function contractInitNomination(roundNum, nominationURI, address){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const retroAddress = deployed_address
  const retroABI = [
    "function nominate(uint256 roundNum, string memory nominationURI, address recipient) public payable"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider)
  await retroContract.connect(signer).nominate(roundNum, nominationURI, address, {value:ethers.utils.parseEther("0.000001")});
}
