const unorderedNominationsData = require('../data/optimismNominations.json');
const fakeNominationsData = require('../data/fakeNominationData.json');
const optimismVoteData = require('../data/optimismVotes.json');
const fakeVoteData = require('../data/fakeVotes.json');
const nominationsData = unorderedNominationsData.sort((a, b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0))

import SiteHead from '../components/SiteHead';
import Layout from '../components/Layout';
import RoundDetailMain from '../components/RoundDetail/Main';
import RoundDetailMainSkeleton from '../components/Skeleton/RoundDetail/MainSkeleton';
import ChartModal from '../components/RoundDetail/Modals/ChartModal';
import FundingModal from '../components/RoundDetail/Modals/FundingModal';
import BadgeholderModal from '../components/RoundDetail/Modals/BadgeholderModal';

import { rounds } from '../data/rounds';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, useContext } from 'react';
import { ethers } from 'ethers';
import { useAccount, useProvider } from 'wagmi';
import { getRounds, getRound } from "../lib/getRounds"
import { deployed_address } from '../contract_config.js';

import { getNominations } from "../lib/getNominations";
import { getBadgeHolderVotes } from '../lib/getBadgeHolderVotes';
import { RoundContext } from '../lib/RoundContext';
import { checkVotingState, getVoteData, checkCanVote, castVote, updateVote, updateBinaryVote, castBinaryVote } from '../lib/votingLogic';

export default function Nominations({ }) {
  //Modal
  const [showChartModal, setShowChartModal] = useState(false)
  const [showBadgeholderModal, setShowBadgeholderModal] = useState(false)
  const [showFundingModal, setShowFundingModal] = useState(false)
  //END

  const [address, setAddress] = useState(false);
  const provider = useProvider();
  const { rounds } = useContext(RoundContext);

  const { data: account } = useAccount();
  useEffect(() => {
    if (!account) return;
    setAddress(account.address);
  }, [account])

  //Get round
  const router = useRouter()
  const roundID = router.query.id;

  const [input, setInput] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [round, setRound] = useState();

  useEffect(() => {
    if (!roundID) {
      return;
    }
    (async () => {
      const _round = (!rounds.length) ? (await getRound(roundID)).round  : rounds[roundID];
      const _input = {
        nominations: await getNominations(roundID, _round),
        round: _round,
        badgeHolderVotes: await getBadgeHolderVotes(roundID, _round)
      }
      setInput(_input)
      setRound(_round)
      setLoaded(true);
    })();

  }, [roundID])

  //const round = rounds.find(o => o.id == roundID);
  // useEffect(() => {
  //   setRound((!rounds.length) ? input.round : rounds[roundID]);
  // }, [input, roundID])
  //END

  //Click on nomination
  const [nomination, setNomination] = useState(0);
  function selectNomination(id) {
    setNomination(id);
  }
  //END

  function getBadgeHolderList(round) {
    var badgeHolderList = {}
    console.log(`in bh list`)
    console.log(`${JSON.stringify(round, null, 2)}`);
    if (!round.badgeholders) {
      return {}
    }
    round.badgeholders.forEach((badgeholder, index) => { badgeHolderList[index] = badgeholder.twitter });
    console.log(badgeHolderList);
    return badgeHolderList;
  }

  function getBadgeHolderMapping(round) {
    var badgeHolderMapping = {}
    console.log(round);
    if (!round.badgeholders) {
      return {}
    }
    round.badgeholders.forEach((badgeHolder) => { badgeHolderMapping[badgeHolder.twitter] = badgeHolder.address });
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

  //Voting logic
  const [votesRemaining, setVotesRemaining] = useState(0);
  const [ballot, setBallot] = useState([]);
  const [canVote, setCanVote] = useState(false);
  const [votingState, setVotingState] = useState(0);
  const [votedOnObject, setVotedOnObject] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function castVoteProxy() {
    await castBinaryVote(ballot, roundID)
    // await castVote(ballot, roundID, nomination);
    setIsSubmitted(true);
  }

  async function updateVoteProxy(index, plus) {
    const { votesRemainingReturn, modBallotReturn, votesObjectReturn } =
      await updateBinaryVote(index, plus, ballot, votesRemaining, round);
    setVotesRemaining(votesRemainingReturn);
    setBallot(modBallotReturn);
    setVotedOnObject(votesObjectReturn);
  }

  useEffect(() => {
    async function foo() {
      const votingState = await checkVotingState(round);
      if (votingState == 1 && address) {
        const vote = await checkCanVote(roundID, address);
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
  }, [address, round])
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
      <Layout>
        {loaded && round ?
          <RoundDetailMain
            roundID={roundID}
            roundName={roundID && round.roundName}
            round={roundID && round}
            selectNomination={selectNomination}
            nomination={input.nominations[nomination]}
            nominationData={input.nominations}
            voteData={getVoteData(round, input)}
            canVote={canVote}
            votingState={votingState}
            updateVote={updateVoteProxy}
            votesRemaining={votesRemaining}
            votedOnObject={votedOnObject}
            showChartModal={() => setShowChartModal(true)}
            isSubmitted={isSubmitted}
            showBadgeholderModal={() => setShowBadgeholderModal(true)}
            showFundingModal={() => setShowFundingModal(true)}
            badgeholderList={() => getBadgeHolderList(round)}
            castVote={castVoteProxy}>
          </RoundDetailMain>
          :
          <RoundDetailMainSkeleton>
          </RoundDetailMainSkeleton>
        }
      </Layout>
      {showChartModal &&
        <ChartModal
          close={() => setShowChartModal(false)}
          voteData={getVoteData(round, input)}>
        </ChartModal>}
      {showBadgeholderModal && round &&
        <BadgeholderModal
          close={() => setShowBadgeholderModal(false)}
          badgeholderList={getBadgeHolderList(round)}>
        </BadgeholderModal>}
      {showFundingModal &&
        <FundingModal
          round={round}
          close={() => setShowFundingModal(false)}>
        </FundingModal>}
    </>
  );
}
