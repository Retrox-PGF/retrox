import { useRouter } from 'next/router'

const RoundCard = ({ roundName, roundID }) => {
  const router = useRouter()
  function cardClick(id) {
    router.push('round-detail?id=' + id)
  }
  return (
    <div className="group" onClick={() => cardClick(roundID)}>
      <div className="bg-yellow-300 text-white group-hover:bg-red-600 m-4 p-4">
      <h1 className="font-bold leading-none text-base tracking-wider text-black group-hover:text-white mb-2 truncate">{roundName}</h1>
      </div>
    </div>
  );
};

export default RoundCard;
