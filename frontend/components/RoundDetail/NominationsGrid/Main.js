import LeftBar from './LeftBar';
import NominationDetail from './NominationDetail';
import VotingTab from './VotingTab';
import VoteAnalysisTab from './VoteAnalysisTab';

export default function NominationsGrid(props) {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      {LeftBar(props.selectNomination, props.nomination, props.nominationData, props.voteData)}
      <div className={`row-span-3 bg-white rounded-xl shadow-md ${props.votingState == 0 || (props.votingState == 1 && props.canVote == false) ? "md:col-span-3" : "md:col-span-2"}`} style={{ maxHeight: "30rem" }}>
        <NominationDetail
          nomination={props.nomination}>
        </NominationDetail>
      </div>
      {props.votingState == 1 && props.canVote ?
        <VotingTab
          isSubmitted={props.isSubmitted}
          votesRemaining={props.votesRemaining}
          votedOnObject={props.votedOnObject}
          selectNomination={props.selectNomination}
          nominationData={props.nominationData}
          updateVote={props.updateVote}
          castVote={props.castVote}
          nomination={props.nomination}>
        </VotingTab>
          :
        props.votingState == 2 ?
          <VoteAnalysisTab
            voteData={props.voteData}
            nomination={props.nomination}
            nominationData={props.nominationData}>
          </VoteAnalysisTab>
        :
        null
      }

    </section>
  )
}
