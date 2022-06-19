import { QuadraticVotesList, QuadraticVotingButtons } from './Voting/QuadraticVoting';
import { BinaryVotesList, BinaryVotingButtons } from './Voting/BinaryVoting';

export default function VotingTab(props) {
  return (
    <div className="flex flex-col md:col-span-1 md:row-span-2 bg-white rounded-xl justify-between py-2 shadow-md overflow-auto h-96">
      <div className="flex flex-row border-b border-gray-100">
      <div className="px-6 py-5 font-semibold text-xl">
        Cast your vote
      </div>
      <div className="px-6 py-5 text-lg ml-auto">
        {!props.isSubmitted && (props.votesRemaining + " votes")}
      </div>
      </div>
      <div className="flex flex-col content-start overflow-auto">
      {!props.isSubmitted ?
        Object.keys(props.votedOnObject).length ?
          (<BinaryVotesList
            votedOnObject={props.votedOnObject}
            selectNomination={props.selectNomination}
            nominationData={props.nominationData}>
          </BinaryVotesList>)
          :
        <div className="text-center text-lg">No votes yet</div>
        :
        <div className="text-center text-lg">Vote completed!</div>}
      </div>
      {!props.isSubmitted ?
        <BinaryVotingButtons
          updateVote={props.updateVote}
          nominationData={props.nominationData}
          nomination={props.nomination}
          castVote={props.castVote}>
        </BinaryVotingButtons>
      : <div></div>}
    </div>
  )
}
