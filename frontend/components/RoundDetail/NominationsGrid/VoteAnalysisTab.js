import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { createDoughnutData, doughnutOptions } from '../../../lib/createDoughnuts';

ChartJS.register(ArcElement, Tooltip);

function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

export default function VoteAnalysisTab(props) {
  return (
    <div className="flex flex-col md:col-span-1 md:row-span-2 bg-white rounded-xl shadow-md">
      <div className="px-6 py-5 font-semibold border-b border-gray-100 text-xl">
        Voting Statistics
      </div>
      <div className="grid grid-rows-2 grid-flow-col">
        <div className="px-6 py-2 text-lg">
          {props.voteData.nominationVotes[props.nomination.projectName] ? props.voteData.nominationVotes[props.nomination.projectName] : 0} votes
        </div>
        <div className="px-6 py-2 text-lg">
          {props.voteData.nominationVotes[props.nomination.projectName] ? Math.round((props.voteData.nominationVotes[props.nomination.projectName] / props.voteData.totalVotes)*100) : 0} % of votes
        </div>
        <div className="px-6 py-2 text-lg">
          {props.voteData.nominationVotes[props.nomination.projectName] ? roundToTwo((props.voteData.nominationVotes[props.nomination.projectName] / props.voteData.totalVotes) * props.voteData.fundingPool) : 0} ETH awarded
        </div>
        <div className="px-6 py-2 text-lg">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-pink-100">
              <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-pink-700"></div>
            </div>
          </div>
          50% of funds received
        </div>
      </div>
      {props.voteData.nominationVotes[props.nomination.projectName] ?
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-center p-2 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
          <div className='w-4/5 h-2/5'>
            <Doughnut data={createDoughnutData(props.voteData.badgeHolderVotes[props.nominationData.indexOf(props.nomination)])} width={400} height={400} options={doughnutOptions}/>
          </div>
        </div>
        <div className="mt-2 text-center">Distribution of votes</div>
      </div> : null }
    </div>
  )
}
