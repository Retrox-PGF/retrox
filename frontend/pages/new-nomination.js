import SiteHead from '../components/SiteHead';
import Layout from '../components/Layout';
import Main from '../components/NewNomination/Main';

import { rounds } from '../data/rounds';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { create } from 'ipfs-http-client';
import { ethers } from 'ethers';

import { contractInitNomination } from '../lib/contractInitNomination';

export default function NewNomination() {

  //RoundID
  const router = useRouter()
  const roundID = router.query.id;
  //END

  //IPFS
  const [ipfs, setIpfs] = useState(null);
  useEffect(() => {
    setIpfs(create({
      url: 'https://ipfs.infura.io:5001/api/v0',
    }));
  }, []);
  //END

  //Form submit
  async function formSubmit(event) {
    event.preventDefault();
    const {nominatorName, projectName, projectURL, projectLeadName, recipientAddress, rationale} = event.target.elements;
    const res = await ipfs.add(JSON.stringify({
      nominatorName: nominatorName.value,
      projectName: projectName.value,
      projectURL: projectURL.value,
      projectLeadName: projectLeadName.value,
      rationale: rationale.value
    }));
    const ipfsURI = `ipfs://${res.path}`;
    const metadata = JSON.stringify({
      ipfsURI: ipfsURI,
      recipientAddress: recipientAddress.value
    })
    console.log(metadata)
    console.log(roundID)
    console.log(recipientAddress.value)
    await contractInitNomination(roundID, ipfsURI, recipientAddress.value)
    // create transaction with staking
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
