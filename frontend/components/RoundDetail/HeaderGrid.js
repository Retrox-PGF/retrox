import Link from 'next/link';

export default function HeaderGrid(props) {
  return (
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div className="mr-6">
        <h1 className="text-4xl font-semibold mb-2">{props.roundName}</h1>
        <h2 className="text-gray-600 ml-0.5">Round initiated on {new Date(props.round.startBlockTimestamp*1000).toDateString()}</h2>
      </div>
      {props.votingState == 0 &&
      <div className="flex flex-wrap items-start justify-end -mb-3">
        <Link href={'/new-nomination?id=' + props.roundID}>
        <a className="inline-flex px-5 py-3 text-white bg-gradient-to-r from-blue-700 to-purple-600 hover:from-purple-700 hover:to-blue-800 rounded-xl shadow-md ml-6 mb-3">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create new nomination
        </a>
        </Link>
      </div>}
      {props.votingState == 2 &&
      <div className="flex flex-wrap items-start justify-end -mb-3">
        <a className="inline-flex px-5 py-3 text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-green-600 hover:to-blue-600 rounded-xl shadow-md ml-6 mb-3" href='/optimism.csv' download>
        <svg
        aria-hidden="true"
        stroke="currentColor"
        className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
        xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ffffff" viewBox="0 0 256 256"><path d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><polyline points="152 32 152 88 208 88" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline><polyline points="100 156 128 184 156 156" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline><line x1="128" y1="120" x2="128" y2="184" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
          Download Data
        </a>
      </div>}
    </div>
  )
}
