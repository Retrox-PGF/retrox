import { motion } from "framer-motion";
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { rounds } from '../data/rounds'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
const siwe = require('siwe');
import { ethers } from 'ethers'
const unorderedNominationsData = require('../data/optimismNominations.json');
const optimismVoteData = require('../data/optimismVotes.json');
import {Doughnut} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartModal from './_components/ChartModal'
import BadgeholderModal from './_components/BadgeholderModal'
import FundingModal from './_components/FundingModal'
// import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'
ChartJS.register(ArcElement, Tooltip);
const nominationsData = unorderedNominationsData.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0))

function createColor() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

const options = {
  plugins: {
    tooltip : {
      displayColors: false,
    }
  }
}

function createDoughnutData(project, legend) {
  if (project === undefined) {
    project = [];
  }
  const returnData = {
  labels: [],
  datasets: [{
    data: [],
    borderWidth: 0.5,
    backgroundColor:  [
    "#0700CF",
    "#1900CF",
    "#2A00CE",
    "#3C00CE",
    "#4D00CE",
    "#5E00CD",
    "#7000CD",
    "#8100CD",
    "#9200CC",
    "#A900D3",
    "#8900CA",
    "#6B00C1",
    "#4F00B8",
    "#3500AF",
    "#1E00A6",
    "#09009D",
    "#000BA2",
    "#0020A7",
    "#0036AC",
    "#004EB1",
    "#0066B6",
    "#0080BA",
    "#0098BF"],
    hoverBackgroundColor: [
      "#0700CF80",
      "#1900CF80",
      "#2A00CE80",
      "#3C00CE80",
      "#4D00CE80",
      "#5E00CD80",
      "#7000CD80",
      "#8100CD80",
      "#9200CC80",
      "#A900D380",
      "#8900CA80",
      "#6B00C180",
      "#4F00B880",
      "#3500AF80",
      "#1E00A680",
      "#09009D80",
      "#000BA280",
      "#0020A780",
      "#0036AC80",
      "#004EB180",
      "#0066B680",
      "#0080BA80",
      "#0098BF80"],
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }]};
  for (const [key, value] of Object.entries(project)) {
    // check length of object entries
    if (key > Object.entries(project).length - 5) {
      break
    }
    if (value != null) {
      returnData.datasets[0].data.push(value);
      // returnData.labels.push(legend[key]);
      returnData.labels.push(legend[key]);
      // returnData.datasets[0].backgroundColor.push(createColor());
      // returnData.datasets[0].hoverBackgroundColor.push(createColor());
    }
  }
  return returnData;
}


const domain = "localhost";
const origin = "https://localhost/login";

function createSiweMessage (address, statement) {
  const siweMessage = new siwe.SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: '1'
  });
  return siweMessage.prepareMessage();
}
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const variantItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

const Aside = () => (
  <motion.aside
  transition={{ duration: 0.2 }}
  initial={{ x: -88}}
        animate={{ x: 0 }}

  className="hidden sm:flex sm:flex-col">
  <Link href="/">
    <a
      className="inline-flex items-center justify-center h-20 w-20 bg-gradient-to-r from-purple-500 to-blue-700 hover:bg-blue-500 focus:bg-blue-500 text-white"
    >
      Retro
    </a>
    </Link>
    <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
      <motion.nav
      initial="hidden"
      animate="visible"
        variants={container}
      className="flex flex-col mx-4 my-6 space-y-4">

      <Link href="/rounds">
        <a
          className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-xl"
        >
          <span className="sr-only">Dashboard</span>
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </a>
        </Link>

        <a
          className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-xl"
        >
          <span className="sr-only">Dashboard</span>
          <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
          >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
          </svg>
        </a>

      </motion.nav>
      <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
        <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
          <span className="sr-only">Settings</span>
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </motion.aside>
);

const Header = (props) => (
  <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
    <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
      <span className="sr-only">Menu</span>
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    </button>
    <div className="relative w-full max-w-md sm:-ml-2 flex items-center">
      <input
        type="text"
        role="search"
        placeholder="Search..."
        className="py-2 pl-10 pr-4 w-full border placeholder-gray-400 focus:bg-gray-50 rounded-lg"
      />
    </div>
    <div className="flex flex-shrink-0 items-center ml-auto">
      <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg" onClick={props.address ? null : () => props.signIn()}>
        <span className="sr-only">User Menu</span>
        <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
          <span className="font-semibold">{props.address ? props.address.slice(0, 6) + '...' + props.address.slice(38): 'Connect wallet'}</span>
          <span className="text-sm text-gray-600">{props.address ? 'Connected' : null}</span>
        </div>
      </button>

    </div>
  </header>
);

function NominationsRow(onCardClick, selectedNomination, nominationData, voteData) {
  const nominations = nominationData.map((nomination) =>
  <li className="flex items-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 p-2 rounded-xl hover:text-white group" onClick={() => onCardClick(nomination.id)} key={nomination.id}>
    <div className="flex flex-col">
    <span className="font-semibold">{nomination.projectName.slice(0,20).trim() + (nomination.projectName.length > 20 ? '...' : '')}</span>
    <span className="text-gray-600 group-hover:text-gray-200">{nomination.rationale.slice(0,25).trim() + (nomination.rationale.length > 25 ? '...' : "")}</span>
    </div>
    <span className="ml-auto font-semibold">{voteData[nomination.projectName] ? voteData[nomination.projectName][Object.keys(voteData.Badgeholder).length - 4] : 0} votes</span>
  </li>
  );
  return (
    <>{nominations}</>
  );
}

const Main = (props) => (
  <motion.main

  transition={{ duration: 0.3, delay: 0}}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 15, opacity: 0 }}
  className="p-6 sm:p-10 space-y-6">
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div className="mr-6">
        <h1 className="text-4xl font-semibold mb-2">{props.roundName}</h1>
        <h2 className="text-gray-600 ml-0.5">Round initiated on the 5th of October 2021</h2>
      </div>
      {props.votingState == 0 &&
      <div className="flex flex-wrap items-start justify-end -mb-3">
        <Link href='/new-nomination'>
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
    </div>

    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="flex items-center p-8 bg-white rounded-xl shadow-md">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-blue-700 to-purple-600 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold">{props.nominationData.length}</span>
          <span className="block text-gray-500">Nominations</span>
        </div>
      </div>
      {props.votingState == 2 ?
        <div className="flex items-center p-8 bg-white rounded-xl shadow-md" onClick={props.setShowChartModal}>
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-green-400 to-indigo-300 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">Voting results</span>
            <span className="block text-gray-500">Click to view results</span>
          </div>
        </div>
        :
      <div className="flex items-center p-8 bg-white rounded-xl shadow-md">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-green-400 to-indigo-300 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold">0 days</span>
          <span className="block text-gray-500">Until voting closes</span>
        </div>
      </div>
      }
      <div className="flex items-center p-8 bg-white rounded-xl shadow-md" onClick={props.showBadgeholderModal}>
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-green-500 to-yellow-300 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
        </div>
        <div>
          <span className="inline-block text-2xl font-bold">{props.voteData && Object.keys(props.voteData['Badgeholder']).length - 4}</span>
          <span className="block text-gray-500">Badgeholders</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-white rounded-xl shadow-md"
      //onClick={props.votingState == 2 ? props.showStreamingModal : undefined }
      onClick={props.showFundingModal}>
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-white bg-gradient-to-r from-blue-400 to-pink-400 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold">$1M</span>
          <span className="block text-gray-500">Pool</span>
        </div>
      </div>
    </section>

    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      <div className="flex flex-col md:col-span-1 md:row-span-2 bg-white rounded-xl shadow-md">
        <div className="px-6 py-5 font-semibold border-b border-gray-100 text-xl">
          Nominations
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
            {props.votesRemaining} votes
          </div>
          </div>
          <div className="flex flex-col content-start overflow-auto">
            {Object.keys(props.votedOnObject).map((obj, i) => (
              <div className="px-3 py-1 text-lg">
                <button className="text-blue-500 hover:text-blue-800" onClick={() => props.selectNomination(parseInt(obj) + 1)}>
                {props.nominationData.find(o => o.id == parseInt(obj) + 1).projectName}: {props.votedOnObject[obj]} votes
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center mt-2 border-t py-2">
            <button onClick={() => props.updateVote(props.nomination.id - 1, false)} className="bg-blue-600 text-white px-4 py-2 rounded-xl mx-2">-</button>
            <button onClick={() => props.updateVote(props.nomination.id - 1, true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl mx-2">+</button>
          </div>
          <div className="flex flex-row items-center justify-center">
            <button onClick={() => props.updateVote(props.nomination.id - 1, false)} className="bg-blue-600 text-white px-4 py-2 rounded-xl mx-2">-</button>
          </div>
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
                <Doughnut data={createDoughnutData(props.voteData[props.nomination.projectName], props.voteData.Badgeholder)} width={400} height={400} options={options}/>
              </div>
            </div>
            <div className="mt-2 text-center">Distribution of votes</div>
          </div> : null }
        </div>
        :
        null
      }

    </section>

    <section className="text-right font-semibold text-gray-500">
      Made with {String.fromCodePoint('0x2764')} by the Oxford Team
    </section>
  </motion.main>
);

function Layout(props) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Aside></Aside>

      <div className="flex-grow text-gray-800">
        <Header signIn={props.signIn} address={props.address}></Header>
        <Main roundID={props.roundID} roundName={props.roundName} nomination={props.nomination} selectNomination={props.selectNomination} nominationData={props.nominationData} voteData={props.voteData} canVote={props.canVote} votingState={props.votingState} updateVote={props.updateVote} votesRemaining={props.votesRemaining} votedOnObject={props.votedOnObject} setShowChartModal={props.showChartModal} showBadgeholderModal={props.showBadgeholderModal} showFundingModal={props.showFundingModal}></Main>
      </div>
    </div>
  );
}

export default function Nominations() {
  const N = 106
  const [address, setAddress] = useState('');
  const [nomination, setNomination] = useState(2);
  const [votesRemaining, setVotesRemaining] = useState(0);
  const [ballot, setBallot] = useState(Array(nominationsData.length).fill(0));
  const [canVote, setCanVote] = useState(false);
  const [votingState, setVotingState] = useState(0);
  const [votedOnObject, setVotedOnObject] = useState({});
  const [showChartModal, setShowChartModal] = useState(false)
  const [showBadgeholderModal, setShowBadgeholderModal] = useState(false)
  const [showFundingModal, setShowFundingModal] = useState(false)
  const [badgeholders, setBadgeholders] = useState()
  const [streamingData, setStreamingData] = useState()

  function updateVote(index, plus) {
    const modBallot = ballot;

    if (plus && (votesRemaining - ((modBallot[index] + 1)*(modBallot[index] + 1) - (modBallot[index])*(modBallot[index]))) >= 0) {
      console.log(modBallot)
      setVotesRemaining(votesRemaining - ((modBallot[index] + 1)*(modBallot[index] + 1) - (modBallot[index])*(modBallot[index])));
      modBallot[index]++;
    } else if (!plus && votesRemaining != 100) {
      if (modBallot[index] != 0) {
        setVotesRemaining(votesRemaining + ((modBallot[index])*(modBallot[index]) - (modBallot[index]-1)*(modBallot[index]-1)));
        modBallot[index]--;
      }
    }
    setBallot(modBallot);
    getVotes(modBallot);
  }

  async function checkCanVote(address) {
    // hasn't voted (need contract communication)
    const hasntVoted = true;

    // is whitelisted (need contract communication)
    const badgeHolders = ['0x']
    // const isWhitelisted = badgeHolders.includes(address)
    const isWhitelisted = true;

    return hasntVoted && isWhitelisted;
  }

  async function checkVotingState() {
    return 1;
  }

  const router = useRouter()
  const roundID = router.query.id;
  const round = rounds.find(o => o.id == roundID);

  function selectNomination(id) {
    setNomination(id);
  }

  useEffect(() => {
    setStreamingData(['10.000', '0.0001'])
  }, [nomination]);

  async function logIn() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await ethereum.request({method: 'eth_requestAccounts'});
    const signer = provider.getSigner();
    const address = await signer.getAddress()
    const signedMessage = await signer.signMessage(createSiweMessage(
      address,
      "Welcome to Retro."
    ));
    window.localStorage.setItem('signedMessage', signedMessage);
    window.localStorage.setItem('userAddress', address)
    setAddress(address);
  }

  function getVotes(ballot) {
    const votesObject = {};
    ballot.forEach((element, i) => {
      if (element) {
        votesObject[i] = element;
      }
    })
    setVotedOnObject(votesObject);
  }

  useEffect(() => {
    setAddress(window.localStorage.getItem("userAddress"))
  }, []);

  useEffect(() => {
    async function foo() {
      const votingState = await checkVotingState();
      if (votingState == 1) {
        const vote = await checkCanVote(address);
        console.log(vote)
        setVotingState(votingState);
        setCanVote(vote);

        if (!vote) {
          return;
        }

        setVotesRemaining(100);
      } else if (votingState == 2) {
        setVotingState(votingState);
      }
    }
    foo();
  }, [])

  const handleKeyPress = useCallback((event) => {
    if (event.key == "Escape") {
      setShowChartModal(false);
      setShowBadgeholderModal(false);
      setShowFundingModal(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout roundID={roundID} roundName={roundID && round.name} signIn={logIn} address={address} selectNomination={selectNomination} nomination={nominationsData.find(o => o.id == nomination)} nominationData={nominationsData} voteData={optimismVoteData} canVote={canVote} votingState={votingState} updateVote={updateVote} votesRemaining={votesRemaining} votedOnObject={votedOnObject} showChartModal={() => setShowChartModal(true)} showBadgeholderModal={() => setShowBadgeholderModal(true)} showFundingModal={() => setShowFundingModal(true)}></Layout>
    {showChartModal && <ChartModal close={() => setShowChartModal(false)} voteData={optimismVoteData}></ChartModal>}
    {showBadgeholderModal && <BadgeholderModal close={() => setShowBadgeholderModal(false)} badgeholderList={optimismVoteData['Badgeholder']}></BadgeholderModal>}
    {showFundingModal && <FundingModal close={() => setShowFundingModal(false)}></FundingModal>}

    {}
    </>
  );
}
