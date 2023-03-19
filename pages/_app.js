import '../styles/globals.css'
import { FooterBanner, Layout} from '../components'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps}) {
  return (
  <StateContext>
    <Layout {...pageProps}>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
    <FooterBanner />
  </StateContext>
  )
}

export default MyApp
