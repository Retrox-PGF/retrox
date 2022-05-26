import SiteHead from '../components/SiteHead';
import Layout from '../components/Layout';
import Main from '../components/NewRound/Main';

import { rounds } from '../data/rounds';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';

import { contractInitRound } from '../lib/contractInitRound';

export default function NewRound() {

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
    const {roundName, funding, nominationDuration, votingDuration, description, badgeholders} = event.target.elements;
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
    await contractInitRound(ipfsURI, addressArray, nominationDuration.value * 86400, votingDuration.value * 86400, funding.value)
  }
  //END

  return (
    <>
    <SiteHead
      title="Retr0x"
      description="Retro-generative public goods funding">
    </SiteHead>
    <Layout>
        <Main
          onSubmit={formSubmit}>
        </Main>
    </Layout>
    </>
  );
}
