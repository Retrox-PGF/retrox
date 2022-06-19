import { motion } from "framer-motion";

import Footer from '../Footer';
import ButtonGrid from './ButtonGrid';
import NominationsGrid from './NominationsGrid/Main';
import HeaderGrid from './HeaderGrid';

export default function RoundDetailMain(props) {
  return (
    <motion.main
    transition={{ duration: 0.3, delay: 0}}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 15, opacity: 0 }}
    className="p-6 sm:p-10 space-y-6">

      <HeaderGrid
        votingState={props.votingState}
        round={props.round}
        roundName={props.roundName}
        roundID={props.roundID}>
      </HeaderGrid>

      <ButtonGrid
        nominationData={props.nominationData}
        votingState={props.votingState}
        showChartModal={props.showChartModal}
        showBadgeholderModal={props.showBadgeholderModal}
        voteData={props.voteData}
        showFundingModal={props.showFundingModal}
        badgeholderList = {props.badgeholderList}
        round={props.round}>
      </ButtonGrid>

      <NominationsGrid
        selectNomination={props.selectNomination}
        nomination={props.nomination}
        nominationData={props.nominationData}
        voteData={props.voteData}
        votingState={props.votingState}
        isSubmitted={props.isSubmitted}
        votesRemaining={props.votesRemaining}
        votedOnObject={props.votedOnObject}
        updateVote={props.updateVote}
        castVote={props.castVote}
        canVote={props.canVote}>
      </NominationsGrid>

      <Footer></Footer>
    </motion.main>
  );
}
