import { motion } from "framer-motion";
import Head from 'next/head'
import Link from 'next/link'
import { rounds } from '../data/rounds'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import { create } from 'ipfs-http-client';
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
    <Link href="/">
    <a
      className="inline-flex items-center justify-center h-20 w-20 bg-gradient-to-r from-purple-600 to-blue-700 hover:bg-blue-500 focus:bg-blue-500 text-white"
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
              strokeWdith="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </a>
        </Link>

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
              strokeWdith="2"
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
              strokeWdith="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWdith="2"
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
          strokeWdith="2"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    </button>
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
        <h1 className="text-4xl font-semibold mb-2">New nomination</h1>
      </div>
    </div>

    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      <div className="row-span-3 col-span-4 bg-white rounded-xl shadow-md">
        <div className="overflow-y-auto p-5">
          <form onSubmit={props.onSubmit}>
            <div className="grid grid-rows-2 grid-flow-col gap-4">
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Nominator name</label>
                <input type="text" placeholder="Retro" name="nominatorName" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Project name</label>
                <input type="text" placeholder="Retro" name="projectName" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Project URL</label>
                <input type="url" placeholder="Retro" name="projectURL" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Project lead name</label>
                <input type="text" placeholder="Retro" name="projectLeadName" className="border rounded-xl p-2" required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Project recipient address</label>
                <input type="text" name="recipientAddress" placeholder="Retro" className="border rounded-xl p-2" maxLength='42' required></input>
              </div>
              <div className="flex flex-col">
                <label className="text-lg ml-1 mb-2">Rationale for nomination</label>
                <textarea name="rationale" className="border rounded-xl p-2" placeholder="This is a description" rows="4" cols="50" required></textarea>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <input type="submit" className="border rounded-xl p-2 bg-blue-600 text-white hover:bg-blue-400 text-lg px-4" text="Nominate"></input>
            </div>
          </form>
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
        <Main onSubmit={props.onSubmit}></Main>
      </div>
    </div>
  );
}

export default function NewNomination() {
  const [address, setAddress] = useState('');
  const [ipfs, setIpfs] = useState(null);

  useEffect(() => {
    setIpfs(create({
      url: 'https://ipfs.infura.io:5001/api/v0',
    }));
  }, []);

  async function formSubmit(event) {
    event.preventDefault();
    const {nominatorName, projectName, projectURL, projectLeadName, recipientAddress, rationale} = event.target.elements;
    console.log(nominatorName.value)
    const res = await ipfs.add(JSON.stringify({
      nominatorName: nominatorName.value,
      projectName: projectName.value,
      projectURL: projectURL.value,
      projectLeadName: projectLeadName.value,
      rationale: rationale.value
    }));
    const ipfsURI = `ipfs://${res.path}`;
    const metadata = JSON.stringify({
      ipfsURI: ipfsURI,
      recipientAddress: recipientAddress.value
    })
    // create transaction with staking
  }

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
  }, []);

  return (
    <>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout onSubmit={formSubmit} signIn={logIn} address={address}></Layout>
    </>
  );
}
