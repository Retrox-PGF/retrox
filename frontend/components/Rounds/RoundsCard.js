import { rounds } from '../../data/rounds'

export default function RoundsCard(props) {
  const cards = props.rounds.map((round, roundID) =>
    <div className="flex items-center p-8 bg-white rounded-xl shadow-md hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 hover:text-white" onClick={() => props.cardClick(roundID)} key={roundID}>
    <div className="flex flex-col">
      <span className="font-semibold">{round.roundName}</span>
      <span className="text-gray-400 mt-2">Open</span>
    </div>
    <span className="ml-auto">{new Date(round.startBlockTimestamp*1000).toDateString()}</span>
    </div>
  );
  return (
    <>{cards}</>
  );
}
