import '../styles/globals.css'
import { Provider, createClient } from 'wagmi'

function MyApp({ Component, pageProps }) {
  const client = createClient({autoConnect: true,});
  return (
    <Provider client={client}>
      <Component {...pageProps}/>
    </Provider>
  )
}

export default MyApp
