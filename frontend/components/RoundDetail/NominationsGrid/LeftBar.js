export default function LeftBar(onCardClick, selectedNomination, nominationData, voteData) {
  const nominations = nominationData.map((nomination, nominationID) =>
  <li className="flex items-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 p-2 rounded-xl hover:text-white group" onClick={() => onCardClick(nominationID)} key={nominationID}>
    <div className="flex flex-col">
    <span className="font-semibold">{nomination.projectName.slice(0,20).trim() + (nomination.projectName.length > 20 ? '...' : '')}</span>
    <span className="text-gray-600 group-hover:text-gray-200">{nomination.rationale.slice(0,25).trim() + (nomination.rationale.length > 25 ? '...' : "")}</span>
    </div>
    <span className="ml-auto font-semibold">{voteData.nominationVotes[nomination.projectName] ? voteData.nominationVotes[nomination.projectName] : 0} votes</span>
  </li>
  );
  return (
    <div className="flex flex-col md:col-span-1 md:row-span-2 bg-white rounded-xl shadow-md">
      <div className="flex flex-row justify-between">
        <div className="px-6 py-5 font-semibold border-b border-gray-100 text-xl">
          Nominations
        </div>
      </div>
      <div className="p-4 flex-grow">
      <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
        <ul className="p-3">
          {nominations}
        </ul>
      </div>
      </div>
    </div>
  );
}
