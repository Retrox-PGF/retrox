import NominationsRow from './NominationsRow';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { createDoughnutData, doughnutOptions } from '../../lib/createDoughnuts';

ChartJS.register(ArcElement, Tooltip);

export default function NominationsGrid(props) {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      <div className="flex flex-col md:col-span-1 md:row-span-2 bg-white rounded-xl shadow-md">
        <div className="flex flex-row justify-between">
          <div className="px-6 py-5 font-semibold border-b border-gray-100 text-xl">
            Nominations
          </div>
        </div>
        <div className="p-4 flex-grow">
        <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
          <ul className="p-3">
            {NominationsRow(props.selectNomination, props.nomination, props.nominationData, props.voteData)}
          </ul>
        </div>
        </div>
      </div>
      <div className={`row-span-3 bg-white rounded-xl shadow-md ${props.votingState == 0 || (props.votingState == 1 && props.canVote == false) ? "md:col-span-3" : "md:col-span-2"}`} style={{ maxHeight: "30rem" }}>
        <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100 text-xl">
          <span>{props.nomination ? props.nomination.projectName : 'Click on nomination to view details'}</span>
        </div>
        <div className="overflow-y-auto p-5" style={{ maxHeight: "24rem" }}>
          {props.nomination ?
            <>
            <div className="font-semibold text-lg">Information</div>
            <div className="grid grid-rows-2 grid-flow-col mb-2">
              <div>Proposer: {props.nomination.nominatorName}</div>
              <div>Website: <a href={props.nomination.projectURL} target="_blank" rel="noreferrer" className="text-blue-600">{props.nomination.projectName}</a></div>
              <div>Project lead: {props.nomination.projectLeadName}</div>
              <div>Project lead email: {props.nomination.projectLeadEmail}</div>
            </div>
          <div className="font-semibold mt-2 text-lg">Description</div>
            <p>
            {props.nomination.rationale}
          </p>
          </>
          :
          null}
        </div>
      </div>
      {props.votingState == 1 && props.canVote ?
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
              (Object.keys(props.votedOnObject).map((obj, i) => (
                <div className="px-3 py-1 text-lg" key={i}>
                  <button className="text-blue-500 hover:text-blue-800" onClick={() => props.selectNomination(parseInt(obj) + 1)}>
                  {props.nominationData.find(o => o.id == parseInt(obj) + 1).projectName}: {props.votedOnObject[obj]} votes
                  </button>
                </div>
              )))
              :
            <div className="text-center text-lg">No votes yet</div>
            :
            <div className="text-center text-lg">Vote completed!</div>}
          </div>
          {!props.isSubmitted ?
          <div className="flex flex-col py-2">
          <div className="flex flex-row items-center justify-center mt-2 py-3 border-t">
            <button onClick={() => props.updateVote(props.nomination.id - 1, false)} className="bg-blue-600 text-white px-4 py-2 rounded-xl mx-2">-</button>
            <button onClick={() => props.updateVote(props.nomination.id - 1, true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl mx-2">+</button>
          </div>
          <div className="flex flex-row items-center justify-center">
            <button onClick={props.castVote()} className="bg-blue-600 text-white px-4 py-2 rounded-xl mx-2">Cast vote</button>
          </div>
          </div>
          : <div></div>}
        </div>
          :
        props.votingState == 2 ?
        <div className="flex flex-col md:col-span-1 md:row-span-2 bg-white rounded-xl shadow-md">
          <div className="px-6 py-5 font-semibold border-b border-gray-100 text-xl">
            Voting Statistics
          </div>
          <div className="grid grid-rows-2 grid-flow-col">
            <div className="px-6 py-2 text-lg">
              {props.voteData[props.nomination.projectName] ? props.voteData[props.nomination.projectName][Object.keys(props.voteData.Badgeholder).length - 4] : 0} votes
            </div>
            <div className="px-6 py-2 text-lg">
              {props.voteData[props.nomination.projectName] ? props.voteData[props.nomination.projectName][Object.keys(props.voteData.Badgeholder).length - 3] : 0} of votes
            </div>
            <div className="px-6 py-2 text-lg">
              {props.voteData[props.nomination.projectName] ? props.voteData[props.nomination.projectName][Object.keys(props.voteData.Badgeholder).length - 1] : 0} awarded
            </div>
            <div className="px-6 py-2 text-lg">
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-pink-100">
                  <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-pink-700"></div>
                </div>
              </div>
              100% of funds received
            </div>
          </div>
          {props.voteData[props.nomination.projectName] ?
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center p-2 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              <div className='w-4/5 h-2/5'>
                <Doughnut data={createDoughnutData(props.voteData[props.nomination.projectName], props.voteData.Badgeholder)} width={400} height={400} options={doughnutOptions}/>
              </div>
            </div>
            <div className="mt-2 text-center">Distribution of votes</div>
          </div> : null }
        </div>
        :
        null
      }

    </section>
  )
}
