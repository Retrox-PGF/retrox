import SiteHead from '../components/SiteHead';
import Layout from '../components/Layout';
import Main from '../components/NewRound/Main';

import { rounds } from '../data/rounds';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';

import signInWithEthereum from '../lib/signInWithEthereum';
import { contractInitRound } from '../lib/contractInitRound';

export default function NewRound() {
  //MetaMask Login
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    const accountWasChanged = (accounts) => {
      setAddress(accounts[0]);
    }
    const getAndSetAccount = async () => {
      const changedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(changedAccounts[0]);
    }
    const clearAccount = () => {
      setAddress();
    };
    window.ethereum.on('accountsChanged', accountWasChanged);
    window.ethereum.on('connect', getAndSetAccount);
    window.ethereum.on('disconnect', clearAccount);
    async function foo() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address)
      } catch(error) {
        return;
      }
    }
    foo();
  }, []);
  //END

  //IPFS
  const [ipfs, setIpfs] = useState(null);
  useEffect(() => {
    setIpfs(create({
      url: 'https://ipfs.infura.io:5001/api/v0',
    }));
  }, []);
  //END

  //Submit form
  async function formSubmit(event) {
    event.preventDefault();
    const {roundName, description, funding, badgeholders} = event.target.elements;
    let lines = badgeholders.value.split("\n")
    const splitLines = [];
    const addressArray = [];
    lines.forEach(element => {
      let contents = element.split(",")
      splitLines.push({address: contents[0].trim(), twitter: contents[1].trim()})
      addressArray.push(contents[0].trim())
    });
    const res = await ipfs.add(JSON.stringify({
      roundName: roundName.value,
      description: description.value,
      badgeholders: splitLines
    }));
    const ipfsURI = `ipfs://${res.path}`;
    const metadata = JSON.stringify({
      ipfsURI: ipfsURI,
      initialPool: funding.value,
      addresses: addressArray
    })
    console.log(metadata)
    // create transaction with value locked
    await contractInitRound(ipfsURI, addressArray, funding.value)
  }
  //END

  return (
    <>
    <SiteHead
      title="Retr0x"
      description="Retro-generative public goods funding">
    </SiteHead>
    <Layout
      signIn={signInWithEthereum}
      address={address}>
        <Main
          onSubmit={formSubmit}>
        </Main>
    </Layout>
    </>
  );
}
