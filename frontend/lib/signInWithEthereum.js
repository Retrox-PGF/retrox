const siwe = require('siwe');
import { ethers } from 'ethers';

const domain = "localhost";
const origin = "https://localhost/login";

function createSiweMessage (address, statement) {
  const siweMessage = new siwe.SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: '1'
  });
  return siweMessage.prepareMessage();
}

export default async function signInWithEthereum() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await ethereum.request({method: 'eth_requestAccounts'});
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const signedMessage = await signer.signMessage(createSiweMessage(
    address,
    "Welcome to Retr0x."
  ));
  return address;
}
