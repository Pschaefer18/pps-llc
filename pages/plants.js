import { Plant } from '../components'
import Head from 'next/head'
import {client} from '../LIB/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

const plants = ({plants, bannerData}) => {
  const { query } = useRouter();
  const [ filter, setFilter] = useState(null)
  useEffect(() => {
    setFilter(query.query)
  }, [query])
  const returnedPlants = plants?.filter(plant => plant.name.toLowerCase().includes(filter))
  return (
    <div style={{minHeight: '89vh'}}>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        </Head>
        <div className='plants'>
          <h2 id="page-title">
            PLANTS
          </h2>
          <div className='plants-filter'>
            <div style={{backgroundColor: filter ? 'rgba(0, 0, 0, 0.25)': 'black'}} onClick={() => setFilter(null)}>Show All</div>
            <div style={{backgroundColor: filter == "native" ? 'black' : 'rgba(0, 0, 0, 0.25)'}} onClick={() => setFilter("native")}>Native Perennials</div>
            <div style={{backgroundColor: filter == "vegetable" ? 'black' : 'rgba(0, 0, 0, 0.25)'}} onClick={() => setFilter("vegetable")}>Vegetables</div>
          </div>
            <div id = "plants-grid" className="plants-grid row row-cols-1 row-cols-xxl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 g-4">
                {(filter && filter != "native" && filter != "vegetable") && (<><h3>Your search for "{query.query}" returned {returnedPlants.length > 0 ? (returnedPlants.length) : ("no")} result{returnedPlants.length !== 1 && 's'}</h3> {returnedPlants.map((plant) => <Plant plant = {plant}/>)}</>)}
                {filter ? (plants?.filter((plant) => plant.category == filter).map((plant) => <Plant plant = {plant}/>)) : (plants?.map((plant) => <Plant plant = {plant}/>))}
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