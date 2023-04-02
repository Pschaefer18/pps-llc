import React from 'react'
import { Product, Layout, FooterBanner, HeroBanner, Navbar, Banner, Homepage} from '../components';
import { client } from '../LIB/client';
import Head from 'next/head';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51MTYJZA8zxkf4hwD5JitH9DH3I4x0UxFyKUPF0s1XPPJSoB31s9g75baDJaVQ2RpxWbDBl94CVY6esSDG3moVLew008CrZ93X2')

const Home = ({ plants, bannerData}) => {
  const options = {
    // passing the client secret obtained in step 3
    clientSecret: '{{CLIENT_SECRET}}',
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };
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
