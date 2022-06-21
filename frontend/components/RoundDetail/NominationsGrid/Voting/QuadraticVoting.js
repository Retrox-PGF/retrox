export function QuadraticVotesList(props) {
  return (
    Object.keys(props.votedOnObject).map((obj, i) => (
      <div className="px-3 py-1 text-lg" key={i}>
        <button className="text-blue-500 hover:text-blue-800" onClick={() => props.selectNomination(parseInt(obj))}>
        {props.nominationData[parseInt(obj)].projectName}: {props.votedOnObject[obj]} votes
        </button>
      </div>
    ))
  )
}

export function QuadraticVotingButtons(props) {
  return (
    <div className="flex flex-col py-2">
      <div className="flex flex-row items-center justify-center mt-2 py-3 border-t">
        <button onClick={() => props.updateVote(props.nominationData.indexOf(props.nomination), false)} className="bg-blue-600 text-white px-4 py-2 rounded-xl mx-2">-</button>
        <button onClick={() => props.updateVote(props.nominationData.indexOf(props.nomination), true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl mx-2">+</button>
      </div>
      <div className="flex flex-row items-center justify-center">
        <button onClick={() => props.castVote()} className="bg-blue-600 text-white px-4 py-2 rounded-xl mx-2">Cast vote</button>
      </div>
    </div>
  )
}
