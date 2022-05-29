import SiteHead from '../components/SiteHead';
import Layout from '../components/Layout';
import RoundsMain from '../components/Rounds/Main';
import RoundsMainSkeleton from '../components/Skeleton/Rounds/RoundsMainSkeleton';

import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { getRounds } from "../lib/getRounds"

export default function Rounds() {
  const [rounds, setRounds] = useState();

  useEffect(() => {
    async function foo() {
      setRounds(await getRounds());
    }
    foo();
  }, [])

  //Round Card Click
  const router = useRouter()
  function cardClick(id) {
    router.push('round-detail?id=' + id)
  }
  //END

  return (
    <>
    <SiteHead
      title="Retrox"
      description="Retro-generative public goods funding">
    </SiteHead>
    <Layout>
      {rounds ?
        <RoundsMain
          rounds={rounds}
          cardClick={cardClick}>
        </RoundsMain>
      :
      <RoundsMainSkeleton>
      </RoundsMainSkeleton>
      }
    </Layout>
    </>
  );
}
