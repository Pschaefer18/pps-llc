import '../styles/globals.css'
import { Layout} from '../components'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps}) {
  return (
  <StateContext>
    <Layout {...pageProps}>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  </StateContext>
  )
}

export default MyApp
