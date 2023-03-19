import Navbar from "./Navbar"
import Head from "next/head"

const Layout = ({children}) => {
  return (
    <div>
      <Head>
        <title>PPS</title>
      </Head>
      <header>
        <Navbar plants = {children[1].props.plants}/>
      </header>
      <main className="main-container">
        {children}
      </main>
    </div>
  )
}
export default Layout