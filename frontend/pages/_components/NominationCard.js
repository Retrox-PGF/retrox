const NominationCard = ({ nominationName, onClick }) => {
  return (
    <div className="group" onClick={onClick}>
      <div className="bg-yellow-300 text-white group-hover:bg-red-600 m-4 p-4">
      <h1 className="font-bold leading-none text-base tracking-wider text-black group-hover:text-white mb-2 truncate">{nominationName}</h1>
      </div>
    </div>
  );
};

export default NominationCard;
