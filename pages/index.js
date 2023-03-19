import react from 'react'
import { Product, Layout, FooterBanner, HeroBanner, Navbar, Banner, Homepage} from '../components';
import { client } from '../LIB/client';
import Head from 'next/head';
const Home = ({ plants, bannerData}) => {
  return (
    <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        </Head>
      <body>
          <Banner />
          <Homepage />
      </body>
    </>
  )
}
export const getServerSideProps = async () => {
  const query = '*[_type == "plant"]'
  const plants = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {plants, bannerData}
  }
}
export default Home
