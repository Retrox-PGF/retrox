import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export default function Header(props) {
  const { data: account } = useAccount()
  const { data: ensName } = useEnsName({ address: account?.address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  return (
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
      {props.search &&
      <div className="relative w-full max-w-md sm:-ml-2 flex items-center">
        <input
          type="text"
          role="search"
          placeholder="Search..."
          className="py-2 pl-10 pr-4 w-full border placeholder-gray-400 focus:bg-gray-50 rounded-lg"
        />
      </div>
      }
      <div className="flex flex-shrink-0 items-center ml-auto">
        <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg" onClick={account ? null : () => connect()}>
          <span className="sr-only">User Menu</span>
          <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
            <span className="font-semibold">{account ? ensName || account.address.slice(0, 6) + '...' + account.address.slice(-4): 'Connect wallet'}</span>
            <span className="text-sm text-gray-600">{account ? 'Connected' : null}</span>
          </div>
        </button>

      </div>
    </header>
  );
}
