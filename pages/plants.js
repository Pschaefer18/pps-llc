import { Plant } from '../components'
import Head from 'next/head'
import {client} from '../lib/client'
import Link from 'next/link'
import { useRouter } from 'next/router'


const plants = ({plants, bannerData}) => {
  const { query } = useRouter();
  console.log(query.query)
  const returnedPlants = plants?.filter(plant => plant.name.toLowerCase().includes(query.query))
  return (
    <div style={{minHeight: '89vh'}}>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        </Head>
        <div className='plants'>
          <h2 id="page-title">
            PLANTS
          </h2>
            <div id = "plants-grid" className="plants-grid row row-cols-1 row-cols-xxl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 g-4">
                {query.query ? (<><h3 style={{width: '100%'}}>`Your search for "{query.query}" returned {returnedPlants.length > 0 ? (returnedPlants.length) : ("no")} results`</h3> {returnedPlants.map((plant) => <Plant plant = {plant}/>)}</>) : (plants?.map((plant) => <Plant plant = {plant}/>))}
            </div>
        </div>
    </div>
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
export default plants