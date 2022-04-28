import { ethers } from 'ethers';

export async function contractInitNomination(roundNum, nominationURI, address){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const retroAddress = "0x3cAD7cd0d54E0794D5864e9979B21a60E04fDC6b"
  const retroABI = [
    "function nominate(uint256 roundNum, string memory nominationURI, address recipient) public payable"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider)
  // await retroContract.connect(signer).nominate(roundNum, nominationURI, address, {value:ethers.utils.parseEther("0.01")});
}
