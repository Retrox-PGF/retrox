import SiteHead from '../components/SiteHead';
import Layout from '../components/Layout';
import RoundsMain from '../components/Rounds/Main';

import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

export default function Rounds({ rounds }) {

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
    <Layout>
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
