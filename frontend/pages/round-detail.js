import { motion } from "framer-motion";
import Head from 'next/head'
import Link from 'next/link'
import { nominations } from './data/nominations'
import { rounds } from './data/rounds'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
const siwe = require('siwe');
import { ethers } from 'ethers'

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
    <a
      href="#"
      className="inline-flex items-center justify-center h-20 w-20 bg-gradient-to-r from-green-500 to-blue-700 hover:bg-blue-500 focus:bg-blue-500 text-white"
    >
      Retro
    </a>
    <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
      <motion.nav
      initial="hidden"
      animate="visible"
        variants={container}
      className="flex flex-col mx-4 my-6 space-y-4">


        <a
          href="/rounds"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </a>

        <a
          href="#"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
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

const Main = (props) => (
  <motion.main

  transition={{ duration: 0.3, delay: 0}}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 15, opacity: 0 }}
  className="p-6 sm:p-10 space-y-6">
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div className="mr-6">
        <h1 className="text-4xl font-semibold mb-2">{props.roundName}</h1>
        <h2 className="text-gray-600 ml-0.5">Round information sentence?</h2>
      </div>
      <div className="flex flex-wrap items-start justify-end -mb-3">
        <Link href='/new-nomination'>
        <a className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-xl shadow-md ml-6 mb-3">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create new nomination
        </a>
        </Link>
      </div>
    </div>

    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="flex items-center p-8 bg-white rounded-xl shadow-md">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold">62</span>
          <span className="block text-gray-500">Nominations</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-white rounded-xl shadow-md">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold">10 days</span>
          <span className="block text-gray-500">Until nominations close</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-white rounded-xl shadow-md">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
        </div>
        <div>
          <span className="inline-block text-2xl font-bold">30</span>
          <span className="block text-gray-500">Badgeholders</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-white rounded-xl shadow-md">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
          <ul className="">
            <li className="flex items-center hover:bg-blue-600 p-2 rounded-xl hover:text-white group border-b">
              <div className="flex flex-col">
              <span className="font-semibold">Retro</span>
              <span className="text-gray-600 group-hover:text-gray-200">Some sentence</span>
              </div>
              <span className="ml-auto font-semibold">0 votes</span>
            </li>
            <li className="flex items-center hover:bg-blue-600 p-2 rounded-xl hover:text-white group">
              <div className="flex flex-col">
              <span className="font-semibold">Retro</span>
              <span className="text-gray-600 group-hover:text-gray-200">Some sentence</span>
              </div>
              <span className="ml-auto font-semibold">0 votes</span>
            </li>
          </ul>
        </div>
        </div>
      </div>
      <div className="row-span-3 md:col-span-2 bg-white rounded-xl shadow-md" style={{ maxHeight: "30rem" }}>
        <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100 text-xl">
          <span>Retro</span>
        </div>
        <div className="overflow-y-auto p-5" style={{ maxHeight: "24rem" }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet turpis eu urna elementum sagittis ut nec arcu. Mauris elementum enim eu mi elementum tristique. Nullam ut nulla eros. In a odio id nunc varius porttitor. Cras quis dolor enim. Aliquam sit amet odio egestas, molestie nisi at, sollicitudin justo. Aenean ultrices ex ornare ex sagittis, vel dictum nunc feugiat.

            Nulla eu hendrerit eros. Quisque sit amet neque volutpat, rutrum erat eu, tristique ligula. Quisque sed diam leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus fermentum venenatis lorem, eu consectetur erat fermentum et. Donec neque odio, ultricies in rutrum sit amet, sagittis quis turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque felis tortor, cursus rutrum tortor quis, malesuada mollis tellus. Duis ullamcorper aliquet nisl, ac consectetur est maximus sit amet. Nam hendrerit dolor nunc, eu tempus velit fermentum ac.

            Etiam a augue consectetur, sollicitudin nisi non, facilisis sem. Fusce convallis velit sit amet pretium faucibus. Nullam nec libero lobortis, molestie orci non, feugiat libero. Nullam mollis nulla ante, at dignissim nisl gravida at. Vivamus vel maximus leo. Donec ac feugiat ante, in aliquam lectus. Fusce bibendum, dui id volutpat tempor, mauris nisi tincidunt erat, a vehicula dui odio nec est. Morbi ut nulla ullamcorper, dictum urna convallis, blandit justo. Donec a gravida nisl. Etiam nec quam a felis pharetra vehicula eu sollicitudin velit. Nulla pharetra id tortor id tempor. Duis et rhoncus ex. Etiam nec enim sodales, scelerisque augue gravida, rhoncus odio.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:col-span-1 md:row-span-2 bg-white rounded-xl shadow-md">
        <div className="px-6 py-5 font-semibold border-b border-gray-100 text-xl">
          Retro voting statistics
        </div>
        <div className="px-6 py-5 font-semibold text-lg">
          Number of votes: 6
        </div>
        <div className="p-4 flex-grow">
          <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
            Pie chart
          </div>
        </div>
      </div>

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
        <Main roundID={props.roundID} roundName={props.roundName}></Main>
      </div>
    </div>
  );
}

export default function Nominations() {
  const [address, setAddress] = useState('');

  const router = useRouter()
  const roundID = router.query.id;
  const round = rounds.find(o => o.id == roundID);

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

  useEffect(() => {
    setAddress(window.localStorage.getItem("userAddress"))
  });

  return (
    <>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout roundID={roundID} roundName={roundID && round.name} signIn={logIn} address={address}></Layout>
    </>
  );
}
