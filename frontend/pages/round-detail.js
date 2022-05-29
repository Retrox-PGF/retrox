const unorderedNominationsData = require('../data/optimismNominations.json');
const fakeNominationsData = require('../data/fakeNominationData.json');
const optimismVoteData = require('../data/optimismVotes.json');
const fakeVoteData = require('../data/fakeVotes.json');
const nominationsData = unorderedNominationsData.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0))

import SiteHead from '../components/SiteHead';
import Layout from '../components/Layout';
import RoundDetailMain from '../components/RoundDetail/Main';
import RoundDetailMainSkeleton from '../components/Skeleton/RoundDetail/MainSkeleton';
import ChartModal from '../components/RoundDetail/Modals/ChartModal';
import FundingModal from '../components/RoundDetail/Modals/FundingModal';
import BadgeholderModal from '../components/RoundDetail/Modals/BadgeholderModal';

import { rounds } from '../data/rounds';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useAccount, useProvider } from 'wagmi';
import { getRounds } from "../lib/getRounds"
import { deployed_address } from '../contract_config.js';

export default function Nominations({ input }) {
  //Modal
  const [showChartModal, setShowChartModal] = useState(false)
  const [showBadgeholderModal, setShowBadgeholderModal] = useState(false)
  const [showFundingModal, setShowFundingModal] = useState(false)
  //END

  const [address, setAddress] = useState(false);
  const provider = useProvider();
  const { data: account } = useAccount();
  useEffect(() => {
    if (!account) return;
    setAddress(account.address);
  }, [account])

  //Get round
  const router = useRouter()
  const roundID = router.query.id;
  //const round = rounds.find(o => o.id == roundID);
  const round = input.rounds[roundID];
  //END
  console.log("nominations");
  console.log(input.nominations);

  //Click on nomination
  const [nomination, setNomination] = useState(0);
  function selectNomination(id) {
    setNomination(id);
  }
  //END

  //Badgeholder logic, status is as follows; {0 = inelligible (not whitelisted), 1 = eligible, 2 = voted}
  async function contractInitBadgeholder(badgeAddress){
    const retroAddress = deployed_address;
    const retroABI = [
      "function getBadgeHolderStatus(uint256 roundNum, address badgeHolder) public view returns (uint256)"
    ]
    console.log(await provider.getCode(retroAddress))
    const retroContract = new ethers.Contract(retroAddress, retroABI, provider);
    return await retroContract.getBadgeHolderStatus(roundID, badgeAddress);
  }
  // END

  //Voting logic
  const [votesRemaining, setVotesRemaining] = useState(0);
  const [ballot, setBallot] = useState(Array(input.nominations.length).fill(0));
  const [canVote, setCanVote] = useState(false);
  const [votingState, setVotingState] = useState(0);
  const [votedOnObject, setVotedOnObject] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    const result = await contractInitBadgeholder(address);
    console.log("voting status", result)
    return result == 1;
  }

  async function checkVotingState() {
    // calculate times based on round:
    // get current time
    // substract time from endtime to check whether voting is closed
    // convert time into votingState
    var votingState = 0;
    if((Date.now()/1000) - round.startBlockTimestamp <= round.nominationDuration) {
      votingState = 0; // nominations in progress
    } else if ((Date.now()/1000)-round.startBlockTimestamp <= (round.nominationDuration + round.votingDuration)){
      votingState = 1; // voting in progress
    } else if ((Date.now()/1000) - round.startBlockTimestamp > (round.nominationDuration + round.votingDuration)) {
      votingState = 2; // voting finished
    }
    console.log("voting state", votingState);
    // return votingState;
    return 2;
  }

  async function castVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const retroAddress = deployed_address;
    const retroABI = [
      "function castVote(uint256 roundNum, uint256 nominationNum, uint256 tokenAllocation) public"
    ]
    const retroContract = new ethers.Contract(retroAddress, retroABI, provider);
    console.log("ballot");
    console.log(ballot);
    const squaredBallot = ballot.map(vote => vote**2);
    console.log("squared ballot");
    const vote = squaredBallot[nomination];
    await retroContract.connect(signer).castVote(roundID, nomination, vote);
    setIsSubmitted(true);
  }

  function getBadgeHolderList() {
    var badgeHolderList = {}
    round.badgeholders.forEach((badgeholder, index) => {badgeHolderList[index] = badgeholder.twitter});
    console.log(badgeHolderList);
    return badgeHolderList;
  }

  function getBadgeHolderMapping() {
    var badgeHolderMapping = {}
    round.badgeholders.forEach((badgeHolder) => {badgeHolderMapping[badgeHolder.twitter] = badgeHolder.address});
    console.log(badgeHolderMapping);
    return badgeHolderMapping;
  }

  // async function getBadgeHolderVotes(nomID, badgeholder) {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const retroAddress = deployed_address;
  //   const retroABI = [
  //     "function getBadgeHolderVotes(uint256 roundNum, uint256 nominationNum, address badgeHolder) public view returns (uint256)"
  //   ]
  //   const retroContract = new ethers.Contract(retroAddress, retroABI, provider);
  //   console.log("roundId", roundID);
  //   console.log("nomID", nomID),
  //   console.log("badegholder", badgeholder);
  //   let vote = await retroContract.getBadgeHolderVotes(roundID, nomID, badgeholder);
  //   return vote;
  // }

  // function getVoteData() {
  //   const voteData = {nominationVotes: {}, totalVotes:round.totalVotes, fundingPool: round.fundsCommitted, badgeHolderVotes: {}}
  //   const badgeHolderList = getBadgeHolderList();
  //   const badgeHolderMapping = getBadgeHolderMapping();
  //   input.nominations.forEach((nomination, nominationIndex) => {
  //     voteData.nominationVotes[nomination.projectName] = nomination.numVotes;
  //     voteData.badgeHolderVotes[nomination.projectName] = {};
  //     for (const [key, badgeholder] of Object.entries(badgeHolderList)) {
  //       (async () => await getBadgeHolderVotes(nominationIndex, badgeHolderMapping[badgeholder]).then(function(result) {
  //         voteData.badgeHolderVotes[nomination.projectName][badgeholder] = result.toNumber();
  //       }))();
  //     }
  //   })
  //   return voteData
  // }

  function getVoteData() {
    const voteData = {nominationVotes: {}, totalVotes:round.totalVotes, fundingPool: round.fundsCommitted, badgeHolderVotes: {}}
    const badgeHolderList = getBadgeHolderList();
    const badgeHolderMapping = getBadgeHolderMapping();
    voteData.badgeHolderVotes = input.badgeHolderVotes;
    input.nominations.forEach((nomination, nominationIndex) => {
      voteData.nominationVotes[nomination.projectName] = nomination.numVotes;
    })
    return voteData
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

  console.log("nomination, ", input.nominations);

  return (
    <>
    <SiteHead
      title="Retr0x"
      description="Retro-generative public goods funding">
    </SiteHead>
    <Layout>
      {false ?
        <RoundDetailMain
          roundID={roundID}
          roundName={roundID && round.roundName}
          round={roundID && round}
          selectNomination={selectNomination}
          nomination={input.nominations[nomination]}
          nominationData={input.nominations}
          voteData={getVoteData()}
          canVote={canVote}
          votingState={votingState}
          updateVote={updateVote}
          votesRemaining={votesRemaining}
          votedOnObject={votedOnObject}
          showChartModal={() => setShowChartModal(true)}
          isSubmitted={isSubmitted}
          showBadgeholderModal={() => setShowBadgeholderModal(true)}
          showFundingModal={() => setShowFundingModal(true)}
          badgeholderList = {getBadgeHolderList()}
          castVote={() => castVote}>
        </RoundDetailMain>
        :
        <RoundDetailMainSkeleton>
        </RoundDetailMainSkeleton>
      }
    </Layout>
    {showChartModal &&
      <ChartModal
        close={() => setShowChartModal(false)}
        voteData={getVoteData()}>
      </ChartModal>}
    {showBadgeholderModal &&
      <BadgeholderModal
        close={() => setShowBadgeholderModal(false)}
        badgeholderList={getBadgeHolderList()}>
      </BadgeholderModal>}
    {showFundingModal &&
      <FundingModal
        round = {round}
        close={() => setShowFundingModal(false)}>
      </FundingModal>}
    </>
  );
}


import { getNominations } from "../lib/getNominations";
import { getBadgeHolderVotes } from '../lib/getBadgeHolderVotes';

export async function getServerSideProps({ query }) {
  return {
    props: {
      input: {
        nominations: await getNominations(query.id),
        rounds: await getRounds(),
        badgeHolderVotes: await getBadgeHolderVotes(query.id)
      }
    }
  }
}
