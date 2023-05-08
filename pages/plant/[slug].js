import { useEffect, useState } from 'react'
import { client, urlfor } from '../../LIB/client'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useStateContext } from '../../context/StateContext'
import { FaArrowLeft } from 'react-icons/fa'
import { db } from '../api/firebase'
import { ref, onValue, get, child } from "firebase/database"
import { reset } from 'canvas-confetti'
import { DateTime } from 'luxon'

const plantPage = ({ plant, inventory }) => {
  console.log(plant)
  const {image, name, variety, pricing_options, scientific_name, slug, features, description, details, category, availability_window} = plant
  const {incQty, decQty, qty, onAdd, resetQty, cartItems, setShowCart} = useStateContext();
  const [option, setOption] = useState(pricing_options[0].option)
  const [availability, setAvailability] = useState("")
  useEffect(() => {
    resetQty()
  }, [])
  useEffect(() => {

    if(DateTime.fromISO(availability_window[0]).ts - DateTime.now().ts > 0) {
      setAvailability("pre-order")
    } else {
      setAvailability("available")
    }
    console.log()
  }, [availability_window])
  const mapOptionName = (option) => {
    const sanityOptionNames = ["Single", "Four pack", "Eight pack", "Six pack", "Twelve pack"]
    const firebaseOptionNames = ["Singles", "Half packs", "Full packs", "Half packs", "Full packs"]
    console.log(firebaseOptionNames[sanityOptionNames.indexOf(option)])
    if (sanityOptionNames.indexOf(option) != -1) {
      console.log(option)
      return firebaseOptionNames[sanityOptionNames.indexOf(option)]
    }
    console.log(option)
    return option
  }
  const getPrice = (option) => {
    return pricing_options.find((opt) => opt.option == option).price
  }
  const handleOptionClick = (opt) => {
    if (opt !== option) {
      setOption(opt)
    }
  }
  const handleOrderNow = () => {
    onAdd(plant, qty, option)
    window.location.href = '/checkout'
  }
  const handleAddToCart = () => {
    onAdd(plant, qty, option)
    setShowCart(true)
  }
  return (
    <div>
      {console.log(pricing_options[0].option)}
      {console.log(option)}
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        </Head>
        <body style ={{minHeight: '100vh'}}className="plantPage">
          <Link style={{textDecoration: 'none', color: 'black', maxWidth:'1000px'}}className="back-to-plants" href="/plants"><h2 style={{maxWidth: '275px', margin: '25px 10px'}}><FaArrowLeft style={{margin: 'auto'}}/>Back To Plants</h2></Link>
          <div
            className="plant-page-card card mb-3"
            style={{
              width: "max-width: 540px",
              margin: "5% 10%",
              padding: "2%",
              paddingBottom: "0px"
            }}
          >
            <div className="row g-0">
            <div className="titles plant-page-phone"style={{ width: "fit-content" }}>
                    <h2 className="card-title">{name} {variety && ` Var: ${variety}`}</h2>
                    <h6
                      className="text-muted"
                      style={{
                        fontStyle: "italic",
                        float: "right",
                        fontSize: "90%",
                      }}
                    >
                      {scientific_name}
                    </h6>
            </div>
            <div className='plant-page-phone features'>
                {features && features.map((img) => {
                  return (
                      <img key={img._key} src={urlfor(img)} width="45px" height="45px"/>
                  )
                })}
              </div>
              <div className="plant-page-left col-lg-6">
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {image.map((img) => {
                    return ((image.indexOf(img) == 0 ? 
                    <div className='carousel-item active'>
                      <img
                      key={img._key}
                      src={urlfor(img)}
                      alt={name}
                      className="img-fluid rounded-start"
                      id="plant-page-image"
                      />
                    </div>
                    :
                    <div className='carousel-item'>
                      <img
                      src={urlfor(img)}
                      alt={name}
                      className="img-fluid rounded-start"
                      id="plant-page-image"
                      />
                    </div>
                    ))
                  })}
                </div>
                {image.length > 1 && <> <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button> </>}
              </div>
                {category == "native" ? 
                (<div className="plant-page-reg" id = "details">
                  <div className="row" style={{ marginBottom: "1%" }}> 
                    <div className="col-6" style={{fontWeight: "bold"}}>
                       Months in bloom: 
                    </div>
                    <div className="col-6"> {details?.hasOwnProperty("bloom") && details.bloom.map((month)=> {return (details.bloom.indexOf(month) != details.bloom.length - 1) ? `${month}, ` : `${month}`})} 
                    </div> 
                  </div> 
                  <div className="row" style={{ marginBottom: "1%" }}>
                    <div className="col-6" style={{fontWeight: "bold"}}>
                      Soil moisture:
                    </div> 
                    <div className="col-6"> 
                      {details?.hasOwnProperty("soil_moisture") && details.soil_moisture.map((moisture)=> {return (details.soil_moisture.indexOf(moisture) != details.soil_moisture.length - 1) ? `${moisture}, ` : `${moisture}`})}
                    </div> 
                  </div>
                  <div className="row" style={{ marginBottom: "1%" }}>
                    <div className="col-6" style={{fontWeight: "bold"}}>
                      Sun exposure:
                    </div>
                    <div className="col-6"> 
                    {details?.hasOwnProperty("sun_exposure") && details.sun_exposure.map((exposure) => {return ((details.sun_exposure.indexOf(exposure) != details.sun_exposure.length - 1) ? `${exposure}, `: `${exposure}`)})} 
                  </div> 
                </div> 
              </div>
                ) : (
                  <div className="plant-page-reg" id = "details">
                    <div className="row" style={{ marginBottom: "1%" }}>
                        <div className="col-6" style={{fontWeight: "bold"}}>
                            Days to maturity:
                        </div>
                        <div className="col-6">
                            {details?.hasOwnProperty("days_to_maturity") && `${details.days_to_maturity} days`}
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: "1%" }}>
                        <div className="col-6" style={{fontWeight: "bold"}}>
                            Soil moisture:
                        </div>
                        <div className="col-6">
                            {details?.hasOwnProperty("soil_moisture") && details.soil_moisture.map((moisture)=> {return (details.soil_moisture.indexOf(moisture) != details.soil_moisture.length - 1) ? `${moisture}, ` : `${moisture}`})}
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: "1%" }}>
                        <div className="col-6" style={{fontWeight: "bold"}}>
                            Sun exposure:
                        </div>
                        <div className="col-6">
                            {details?.hasOwnProperty("sun_exposure") && details.sun_exposure.map((exposure) => {return ((details.sun_exposure.indexOf(exposure) != details.sun_exposure.length - 1) ? `${exposure}, `: `${exposure}`)})}
                        </div>
                    </div>
                </div>
                )}
              </div>
              <div className="col-lg-6">
                <div className="card-body">
                  <div className="plant-page-reg" style={{ width: "fit-content" }}>
                    <div className="card-title" style={{display: "flex", alignItems: "baseline"}}><h2>{name}</h2> <h5 style = {{marginLeft: '10px'}}>{variety && ` Var: ${variety}`}</h5></div>
                    <h6
                      className="text-muted"
                      style={{
                        fontStyle: "italic",
                        float: "right",
                        fontSize: "90%",
                      }}
                    >
                      {scientific_name}
                    </h6>
                  </div>
                  <br />
                  <div className=' plant-page-reg features'>
                      {features && features.map((img) => {
                        return (
                            <img key={img._key} src={urlfor(img)} width="45px" height="45px"/>
                        )
                      })}
                  </div>
                  <p style={{marginTop: "20px"}} className="card-text">{description}</p>
                  <p className="card-text">
                    {/* <Link href="/">
                      <small className="growing-info-link text-muted">
                        See Growing Information
                      </small>
                    </Link> */}
                  </p>
                  <div class="container overflow-hidden text-center" style={{marginBottom: "20%"}}>
                    <div class="row">
                      <div class="col-4">
                        <h6>
                          Availability:
                        </h6>
                      </div>
                      <div class="col-8">
                        {availability == "pre-order" && <h6 style={{color: '#3c5ff9'}}>Pre-order (available: {DateTime.fromISO(availability_window[0]).toFormat('LLL dd, yyyy')})</h6>}
                        {availability == "available" && <h6 className = "text-success">Available Now</h6>}
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                          <h6>
                            Price:
                          </h6>
                        </div>
                        <div className="col-8">
                        <h6 style={{textAlign: 'left', margin: 'auto'}}>
                          ${getPrice(option)}.00
                          </h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <h6>
                            Options:
                          </h6>
                        </div>
                        <div className="select-container col-9">
                              {pricing_options.map((opt) =>
                              option == opt["option"] ? (
                                <div className="option" style={{backgroundColor: '#2c61fc', color: 'white'}} onClick={() => handleOptionClick(opt["option"])}>{opt["option"]}</div>
                              ) : (
                                <div className="option" onClick={() => handleOptionClick(opt["option"])}>{opt["option"]}</div>
                              )
                              )}
                        </div>
                      </div>
                    <div class="row">
                      <div class="col-4">
                        <h6 >
                          Quantity:
                        </h6>
                      </div>
                      <div class="col-3">
                        <div className="plant-qty-selection" style={{ margin: "auto"}}>
                          <button
                          onClick={decQty}
                          style={{
                            padding: "0px 7.5px 5px 7.5px",
                            fontSize: "24px",
                            lineHeight: "0px",
                            verticalAlign: "middle",
                          }}
                          className="btn btn-primary"
                        >
                          -
                          </button>
                          <span>
                          {qty}
                          </span>
                          <button
                          onClick={incQty}
                          style={{
                            padding: "0px 6px 5px 6px",
                            fontSize: "24px",
                            lineHeight: "0px",
                            outline: "none"
                          }}
                          className="btn btn-primary"
                        >
                          +
                          </button>
                        </div>
                      </div>
                      <div class="col-4">
                      { inventory[mapOptionName(option)] ?
                        <span style={{marginLeft: "10px", color: "green"}}>{Math.floor(inventory[mapOptionName(option)])} in stock </span>
                      :
                        <span style={{marginLeft: "10px", color: "black", fontWeight: "bolda"}}> out of stock</span>}
                      </div>
                    </div>
                  </div>
                  

                    <div className="transaction-buttons">
                    <div style={{ position: "relative", display: "flex", justifyContent: "space-evenly"}}>
                    <button
                      disabled = {!(inventory[mapOptionName(option)])}
                      onClick={handleAddToCart}
                      type="button"
                      className="transaction-button btn btn-primary"
                    >
                      add to cart
                    </button>
                    <button
                      disabled = {!(inventory[mapOptionName(option)])}
                      onClick={handleOrderNow}
                      type="button"
                      className="transaction-button btn btn-primary"
                      style={{textDecoration: 'none'}}                     >
                      {availability == "pre-order" ? "Pre-order Now" : "Order Now"}
                    </button>
                    </div>
                    </div>  
                  
                  
                  {category == "native" ? 
                (<div className="plant-page-phone" id = "details">
                  <div className="row" style={{ marginBottom: "1%" }}> 
                    <div className="col-6" style={{fontWeight: "bold"}}>
                       In bloom: 
                    </div>
                    <div className="col-6"> {details?.hasOwnProperty("bloom") && details.bloom.map((month)=> {return (details.bloom.indexOf(month) != details.bloom.length - 1) ? `${month}, ` : `${month}`})} 
                    </div> 
                  </div> 
                  <div className="row" style={{ marginBottom: "1%" }}>
                    <div className="col-6" style={{fontWeight: "bold"}}>
                      Soil moisture:
                    </div> 
                    <div className="col-6"> 
                      {details?.hasOwnProperty("soil_moisture") && details.soil_moisture.map((moisture)=> {return (details.soil_moisture.indexOf(moisture) != details.soil_moisture.length - 1) ? `${moisture}, ` : `${moisture}`})}
                    </div> 
                  </div>
                  <div className="row" style={{ marginBottom: "1%" }}>
                    <div className="col-6" style={{fontWeight: "bold"}}>
                      Sun exposure:
                    </div>
                    <div className="col-6"> 
                    {details?.hasOwnProperty("sun_exposure") && details.sun_exposure.map((exposure) => {return ((details.sun_exposure.indexOf(exposure) != details.sun_exposure.length - 1) ? `${exposure}, `: `${exposure}`)})} 
                  </div> 
                </div> 
              </div>
                ) : (
                  <div className="plant-page-phone" id = "details">
                    <div className="row" style={{ marginBottom: "1%" }}>
                        <div className="col-6" style={{fontWeight: "bold"}}>
                            Days to maturity:
                        </div>
                        <div className="col-6">
                            {details?.hasOwnProperty("days_to_maturity") && `${details.days_to_maturity} days`}
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: "1%" }}>
                        <div className="col-6" style={{fontWeight: "bold"}}>
                            Soil moisture:
                        </div>
                        <div className="col-6">
                            {details?.hasOwnProperty("soil_moisture") && details.soil_moisture.map((moisture)=> {return (details.soil_moisture.indexOf(moisture) != details.soil_moisture.length - 1) ? `${moisture}, ` : `${moisture}`})}
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: "1%" }}>
                        <div className="col-6" style={{fontWeight: "bold"}}>
                            Sun exposure:
                        </div>
                        <div className="col-6">
                            {details?.hasOwnProperty("sun_exposure") && details.sun_exposure.map((exposure) => {return ((details.sun_exposure.indexOf(exposure) != details.sun_exposure.length - 1) ? `${exposure}, `: `${exposure}`)})}
                        </div>
                    </div>
                </div>
                )}
                </div>
              </div>
            </div>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
        </body>
    </div>
  )
}

export const getServerSideProps = async ({ params: { slug }}) => {
    const query = `*[_type == "plant" && slug.current == '${slug}'][0]`
    const plantsQuery = '*[_type == "plant"]'

    const plants = await client.fetch(plantsQuery);
    const plant = await client.fetch(query);
    console.log(plant.slug.current)
    const inventoryRef = ref(db, `/Inventory/${plant.slug.current}`)
    const inventorySnapshot = await get(inventoryRef, '/');
    const inventory = inventorySnapshot.val();

    return {
        props: { plant, plants, inventory }
    }
}
export default plantPage