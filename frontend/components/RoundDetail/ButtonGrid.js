function NominationCard(props) {
  return (
    <div className="flex items-center p-8 bg-white rounded-xl shadow-md">
      <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-blue-700 to-purple-400 rounded-full mr-6">
        <svg
        aria-hidden="true"
        stroke="currentColor"
        className="h-9 w-9"
        xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ffffff" viewBox="0 0 256 256"><circle cx="128" cy="140" r="40" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M196,116a59.8,59.8,0,0,1,48,24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M12,140a59.8,59.8,0,0,1,48-24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M70.4,216a64.1,64.1,0,0,1,115.2,0" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M60,116A32,32,0,1,1,91.4,78" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M164.6,78A32,32,0,1,1,196,116" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
      </div>
      <div>
        <span className="block text-2xl font-bold">{props.nominationData.length}</span>
        <span className="block text-gray-500">Nominations</span>
      </div>
    </div>
  )
}

function VotingStateCard(props) {
  //do formatting with props.round

  return (
    <>
    {props.votingState == 2 ?
      <div className="flex items-center p-8 bg-white rounded-xl shadow-md" onClick={props.showChartModal}>
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-6">
          <svg
          aria-hidden="true"
          stroke="currentColor"
          className="h-9 w-9"
          xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ffffff" viewBox="0 0 256 256"><line x1="96" y1="56" x2="96" y2="200" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><path d="M24,167.2a7.9,7.9,0,0,1,6.4-7.8,32.1,32.1,0,0,0,0-62.8A7.9,7.9,0,0,1,24,88.8V64a8,8,0,0,1,8-8H224a8,8,0,0,1,8,8V88.8a7.9,7.9,0,0,1-6.4,7.8,32.1,32.1,0,0,0,0,62.8,7.9,7.9,0,0,1,6.4,7.8V192a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8Z" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
        </div>
        <div>
          <span className="block text-2xl font-bold">Voting results</span>
          <span className="block text-gray-500">Click to view results</span>
        </div>
      </div>
      :

    props.votingState == 1 ?
    <div className="flex items-center p-8 bg-white rounded-xl shadow-md">
      <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-6">
      <svg
      aria-hidden="true"
      stroke="currentColor"
      className="h-9 w-9"
      xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ffffff" viewBox="0 0 256 256"><line x1="96" y1="56" x2="96" y2="200" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><path d="M24,167.2a7.9,7.9,0,0,1,6.4-7.8,32.1,32.1,0,0,0,0-62.8A7.9,7.9,0,0,1,24,88.8V64a8,8,0,0,1,8-8H224a8,8,0,0,1,8,8V88.8a7.9,7.9,0,0,1-6.4,7.8,32.1,32.1,0,0,0,0,62.8,7.9,7.9,0,0,1,6.4,7.8V192a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8Z" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
      </div>
      <div>
        <span className="block text-2xl font-bold">{Math.round((props.round.votingDuration - (Date.now()/1000) + props.round.startBlockTimestamp + props.round.nominationDuration)/86400)} days</span>
        <span className="block text-gray-500">Until voting closes</span>
      </div>
    </div>
    :
    <div className="flex items-center p-8 bg-white rounded-xl shadow-md">
      <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-6">
      <svg
      aria-hidden="true"
      stroke="currentColor"
      className="h-9 w-9"
      xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ffffff" viewBox="0 0 256 256"><line x1="96" y1="56" x2="96" y2="200" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><path d="M24,167.2a7.9,7.9,0,0,1,6.4-7.8,32.1,32.1,0,0,0,0-62.8A7.9,7.9,0,0,1,24,88.8V64a8,8,0,0,1,8-8H224a8,8,0,0,1,8,8V88.8a7.9,7.9,0,0,1-6.4,7.8,32.1,32.1,0,0,0,0,62.8,7.9,7.9,0,0,1,6.4,7.8V192a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8Z" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
      </div>
      <div>
        <span className="block text-2xl font-bold">{Math.round((props.round.nominationDuration - (Date.now()/1000) + props.round.startBlockTimestamp)/86400)} days</span>
        <span className="block text-gray-500">Until nominations close</span>
      </div>
    </div>
    }
    </>
  )
}

function BadgeholderCard(props) {
  return (
    <div className="flex items-center p-8 bg-white rounded-xl shadow-md" onClick={props.showBadgeholderModal}>
      <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-blue-600 to-red-600 rounded-full mr-6">
        <svg
        aria-hidden="true"
        stroke="currentColor"
        className="h-9 w-9"
        xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ffffff" viewBox="0 0 256 256"><circle cx="128" cy="136" r="32" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M80,192a60,60,0,0,1,96,0" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><rect x="32" y="48" width="192" height="160" rx="8" transform="translate(256) rotate(90)" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></rect><line x1="96" y1="64" x2="160" y2="64" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
      </div>
      <div>
        <span className="inline-block text-2xl font-bold">{props.voteData && Object.keys(props.badgeholderList).length}</span>
        <span className="block text-gray-500">Badgeholders</span>
      </div>
    </div>
  )
}

function FundingCard(props) {
  return (
    <div className="flex items-center p-8 bg-white rounded-xl shadow-md"
    onClick={props.showFundingModal}>
      <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-red-500 to-purple-700 rounded-full mr-6">
        <svg
        aria-hidden="true"
        stroke="currentColor"
        className="h-9 w-9"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect x="16" y="64" width="224" height="128" rx="8" fill="none" stroke="#fffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></rect><circle cx="128" cy="128" r="32" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><line x1="176" y1="64" x2="240" y2="120" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="176" y1="192" x2="240" y2="136" fill="none" stroke="#fffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="80" y1="64" x2="16" y2="120" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="80" y1="192" x2="16" y2="136" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
      </div>
      <div>
        <span className="block text-2xl font-bold">{props.round.fundsCommitted} ETH</span>
        <span className="block text-gray-500">Pool</span>
      </div>
    </div>
  )
}

export default function ButtonBar(props) {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <NominationCard
        nominationData={props.nominationData}>
      </NominationCard>
      <VotingStateCard
        votingState={props.votingState}
        showChartModal={props.showChartModal}
        round={props.round}>
      </VotingStateCard>
      <BadgeholderCard
        badgeholderList = {props.badgeholderList}
        showBadgeholderModal={props.showBadgeholderModal}
        voteData={props.voteData}>
      </BadgeholderCard>
      <FundingCard
        showFundingModal={props.showFundingModal}
        round={props.round}>
      </FundingCard>
    </section>
  )
}
