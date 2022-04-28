const unorderedNominationsData = require('../data/optimismNominations.json');
const fakeNominationsData = require('../data/fakeNominationData.json');
const optimismVoteData = require('../data/optimismVotes.json');
const fakeVoteData = require('../data/fakeVotes.json');
const nominationsData = unorderedNominationsData.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0))

import SiteHead from '../components/SiteHead';
import Layout from '../components/Layout';
import RoundDetailMain from '../components/RoundDetail/Main';
import ChartModal from '../components/RoundDetail/Modals/ChartModal';
import FundingModal from '../components/RoundDetail/Modals/FundingModal';
import BadgeholderModal from '../components/RoundDetail/Modals/BadgeholderModal';

import { rounds } from '../data/rounds';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

import signInWithEthereum from '../lib/signInWithEthereum';

export default function Nominations({ nominations }) {
  //Modal
  const [showChartModal, setShowChartModal] = useState(false)
  const [showBadgeholderModal, setShowBadgeholderModal] = useState(false)
  const [showFundingModal, setShowFundingModal] = useState(false)
  //END

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

  //Get round
  const router = useRouter()
  const roundID = router.query.id;
  const round = rounds.find(o => o.id == roundID);
  //END

  //Click on nomination
  const [nomination, setNomination] = useState(1);
  function selectNomination(id) {
    setNomination(id);
  }
  //END

  //Badgeholder logic
  async function contractInitBadgeholder(roundNum, badgeAddress){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const retroAddress = "0x3cAD7cd0d54E0794D5864e9979B21a60E04fDC6b"
    const retroABI = [
      "function getBadgeHolderStatus(uint256 roundNum, address badgeHolder) public view returns (uint256)"
    ]
    const retroContract = new ethers.Contract(retroAddress, retroABI, provider)
    // await retroContract.connect(signer).getBadgeHolderStatus(roundNum, badgeAddress);
  }
  //

  //Voting logic
  const [votesRemaining, setVotesRemaining] = useState(0);
  const [ballot, setBallot] = useState(Array(nominations.nominationData.length).fill(0));
  const [canVote, setCanVote] = useState(false);
  const [votingState, setVotingState] = useState(0);
  const [votedOnObject, setVotedOnObject] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false)
  function updateVote(index, plus) {
    const modBallot = ballot;

    if (plus && (votesRemaining - ((modBallot[index] + 1)*(modBallot[index] + 1) - (modBallot[index])*(modBallot[index]))) >= 0) {
      setVotesRemaining(votesRemaining - ((modBallot[index] + 1)*(modBallot[index] + 1) - (modBallot[index])*(modBallot[index])));
      modBallot[index]++;
    } else if (!plus && votesRemaining != 100) {
      if (modBallot[index] != 0) {
        setVotesRemaining(votesRemaining + ((modBallot[index])*(modBallot[index]) - (modBallot[index]-1)*(modBallot[index]-1)));
        modBallot[index]--;
      }
    }
    setBallot(modBallot);
    getVotes(modBallot);
  }


  async function checkCanVote(address) {
    // return (await contractInitBadgeholder(roundID, address)) == 1
    return 1
  }

  async function checkVotingState() {
    console.log(nominations.votingState)
    return nominations.votingState;
  }

  async function castVote() {
    setIsSubmitted(true)
  }

  function getVotes(ballot) {
    const votesObject = {};
    ballot.forEach((element, i) => {
      if (element) {
        votesObject[i] = element;
      }
    })
    setVotedOnObject(votesObject);
  }

  useEffect(() => {
    async function foo() {
      const votingState = await checkVotingState();
      if (votingState == 1 && address) {
        const vote = await checkCanVote(address);
        setVotingState(votingState);
        setCanVote(vote);

        if (!vote) {
          return;
        }

        setVotesRemaining(100);
      } else if (votingState == 2) {
        setVotingState(votingState);
      }
    }
    foo();
  }, [address])
  //END

  //Close Modals
  const handleKeyPress = useCallback((event) => {
    if (event.key == "Escape") {
      setShowChartModal(false);
      setShowBadgeholderModal(false);
      setShowFundingModal(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
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
        <RoundDetailMain
          roundID={roundID}
          roundName={roundID && round.name}
          round={roundID && round}
          selectNomination={selectNomination}
          nomination={nominations.nominationData.find(o => o.id == nomination)}
          nominationData={nominations.nominationData}
          voteData={nominations.voteData}
          canVote={canVote}
          votingState={votingState}
          updateVote={updateVote}
          votesRemaining={votesRemaining}
          votedOnObject={votedOnObject}
          showChartModal={() => setShowChartModal(true)}
          isSubmitted={isSubmitted}
          showBadgeholderModal={() => setShowBadgeholderModal(true)}
          showFundingModal={() => setShowFundingModal(true)}
          castVote={() => castVote}>
        </RoundDetailMain>
    </Layout>
    {showChartModal &&
      <ChartModal
        close={() => setShowChartModal(false)}
        voteData={nominations.voteData}>
      </ChartModal>}
    {showBadgeholderModal &&
      <BadgeholderModal
        close={() => setShowBadgeholderModal(false)}
        badgeholderList={nominations.voteData['Badgeholder']}>
      </BadgeholderModal>}
    {showFundingModal &&
      <FundingModal
        close={() => setShowFundingModal(false)}>
      </FundingModal>}
    </>
  );
}


import { getNominations } from "../lib/getNominations";

export async function getServerSideProps({ query }) {
  return {
    props: {
      nominations: {
        nominationData: query.id == 1 ? nominationsData : fakeNominationsData,
        voteData: query.id == 1 ? optimismVoteData : fakeVoteData,
        votingState: query.id == 1 ? 2 : 1
      }
    }
  }
}
