import Navbar from "./Navbar"
import Head from "next/head"
import FooterBanner from "./FooterBanner"

const Layout = ({children}) => {
  return (
    <div>
      <Head>
        <title>Paul's Plant Starts</title>
      </Head>
      <header>
        <Navbar plants = {children[1].props.plants}/>
      </header>
      <main className="main-container">
        {children}
      </main>
      <FooterBanner />
    </div>
  )
}
export default Layout