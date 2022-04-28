import { rounds } from '../../data/rounds'

export default function RoundsCard(cardClick) {
  const cards = rounds.map((round) =>
    <div className="flex items-center p-8 bg-white rounded-xl shadow-md hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 hover:text-white" onClick={() => cardClick(round.id)} key={round.id}>
    <div className="flex flex-col">
      <span className="font-semibold">{round.name}</span>
      <span className="text-gray-400 mt-2">{round.category}</span>
    </div>
    <span className="ml-auto">{round.date}</span>
    </div>
  );
  return (
    <>{cards}</>
  );
}
