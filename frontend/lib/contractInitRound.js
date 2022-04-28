import { ethers } from 'ethers'

export async function contractInitRound(roundURI, badgeholders, value){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log(signer)
  const retroAddress = "0x3cAD7cd0d54E0794D5864e9979B21a60E04fDC6b"
  const retroABI = [
    "function createRound(string memory roundURI, address[] memory badgeHolders) public payable"
  ]
  const retroContract = new ethers.Contract(retroAddress, retroABI, provider)
  // await retroContract.connect(signer).createRound(roundURI, badgeholders, {value:ethers.utils.parseEther(`${value}`)});
}
