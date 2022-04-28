import SiteHead from '../components/SiteHead';
import Layout from '../components/Layout';
import RoundsMain from '../components/Rounds/Main';

import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

import signInWithEthereum from '../lib/signInWithEthereum';

export default function Rounds({ rounds }) {
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

  //Round Card Click
  const router = useRouter()
  function cardClick(id) {
    router.push('round-detail?id=' + id)
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
        <RoundsMain
          cardClick={cardClick}>
        </RoundsMain>
    </Layout>
    </>
  );
}


// import { getRounds } from "../lib/getRounds"
//
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       rounds: await getRounds()
//     }
//   }
// }
