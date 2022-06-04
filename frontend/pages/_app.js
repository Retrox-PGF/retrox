import '../styles/globals.css'
import { Provider, createClient } from 'wagmi'
import { RoundContextProvider } from '../lib/RoundContext';

function MyApp({ Component, pageProps }) {
  const client = createClient({ autoConnect: true, });
  return (
    <Provider client={client}>
      <RoundContextProvider>
        <Component {...pageProps} />
      </RoundContextProvider>
    </Provider>
  )
}

export default MyApp
