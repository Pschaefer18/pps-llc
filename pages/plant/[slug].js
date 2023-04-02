import { useState } from 'react'
import { client, urlfor } from '../../LIB/client'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useStateContext } from '../../context/StateContext'
import { FaArrowLeft } from 'react-icons/fa'

const plantPage = ({ plant }) => {
  const {image, name, pricing_options, scientific_name, slug, features, description, details} = plant
  const {incQty, decQty, qty, onAdd, cartItems, setShowCart} = useStateContext();
  const [option, setOption] = useState(pricing_options[0].option)
  const getPrice = (option) => {
    return pricing_options.find((opt) => opt.option == option).price
  }
  return (
    <div>
      {console.log(pricing_options[0].option)}
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
            <div className="plant-page-phone"style={{ width: "fit-content" }}>
                    <h2 className="card-title">{name}</h2>
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
                      <img src={urlfor(img)} width="45px" height="45px"/>
                  )
                })}
              </div>
              <div className="plant-page-left col-md-6">
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {image.map((img) => {
                    return ((image.indexOf(img) == 0 ? 
                    <div className='carousel-item active'>
                      <img
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
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
                <table className="plant-page-reg" id = "details">
                    <colgroup>
                        <col style={{width: "50%", paddingRight: "10%"}}></col>
                        <col style={{float: "right"}}></col>
                    </colgroup>
                    <tr style={{ marginBottom: "1%" }}>
                        <td style={{fontWeight: "bold"}}>
                            Months in bloom:
                        </td>
                        <td>
                            {details?.hasOwnProperty("bloom") && details.bloom.map((month)=> {return (details.bloom.indexOf(month) != details.bloom.length - 1) ? `${month}, ` : `${month}`})}
                        </td>
                    </tr>
                    <tr style={{ marginBottom: "1%" }}>
                        <td style={{fontWeight: "bold"}}>
                            Soil moisture:
                        </td>
                        <td>
                            {details?.hasOwnProperty("soil_moisture") && details.soil_moisture.map((moisture)=> {return (details.soil_moisture.indexOf(moisture) != details.soil_moisture.length - 1) ? `${moisture}, ` : `${moisture}`})}
                        </td>
                    </tr>
                    <tr style={{ marginBottom: "1%" }}>
                        <td style={{fontWeight: "bold"}}>
                            Sun exposure:
                        </td>
                        <td>
                            {details?.hasOwnProperty("sun_exposure") && details.sun_exposure.map((exposure) => {return ((details.sun_exposure.indexOf(exposure) != details.sun_exposure.length - 1) ? `${exposure}, `: `${exposure}`)})}
                        </td>
                    </tr>
                </table>
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <div className="plant-page-reg" style={{ width: "fit-content" }}>
                    <h2 className="card-title">{name}</h2>
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
                  <div className='plant-page-reg features'>
                      {features && features.map((img) => {
                        return (
                            <img src={urlfor(img)} width="45px" height="45px"/>
                        )
                      })}
                  </div>
                  <p className="card-text">{description}</p>
                  <p className="card-text">
                    {/* <Link href="/">
                      <small className="growing-info-link text-muted">
                        See Growing Information
                      </small>
                    </Link> */}
                  </p>
                  <table className="plant-page-table">
                    <tr>
                      <td style={{paddingLeft: "0px"}}>
                        <h6>
                          Availability:
                        </h6>
                      </td>
                        <td>
                          Pre-ordering available April 1st
                        </td>
                    </tr>
                    <tr>
                      <td style={{paddingLeft: "0px"}}>
                        <h6>
                          Quantity:
                        </h6>
                      </td>
                      <td style={{paddingLeft: "0px"}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                          <div className="plant-qty-selection" style={{ margin: "auto"}}>
                        <button
                          onClick={decQty}
                          style={{
                            padding: "5px",
                            fontSize: "24px",
                            lineHeight: "0px",
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
                            padding: "5px",
                            fontSize: "24px",
                            lineHeight: "0px",
                          }}
                          className="btn btn-primary"
                        >
                          +
                        </button>
                          </div>
                          <div style={{ width: "fit-content" }}>
                          <div id="select-wrapper-841361" className="select-wrapper">
                            <select
                              className="select select-initialized"
                              onChange={(e) => setOption(e.target.value)}
                            >
                              {pricing_options.map((opt) =>
                                <option value={opt["option"]}>{opt["option"]}</option>
                              )}
                            </select>
                          </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style= {{paddingTop: "10px", paddingLeft: "0px"}}>
                        <h6>
                          Price:
                        </h6>
                      </td>
                      <td style={{paddingTop: "10px"}}>
                        <h6>
                          ${getPrice(option)}.00
                        </h6>
                      </td>
                    </tr>
                    <div style={{ display: "flex"}}>
                    
                    
                    </div>
                  </table>
                  
                  <div className="transaction-buttons">
                    <div style={{ position: "relative", display: "flex", justifyContent: "space-evenly"}}>
                    <button
                      onClick={() => onAdd(plant, qty, option)}
                      style={{backgroundColor: "rgba(0,0,255,0.25)",position: "relative", padding: "2.5% 7.5%"}}
                      type="button"
                      className="btn btn-primary"
                    >
                      add to cart
                    </button>
                    <Link href="/checkout">
                    <button
                      style={{backgroundColor: "rgba(0,0,255,0.25)", position: "relative", padding: "2.5% 7.5%" }}
                      type="button"
                      className="btn btn-primary"
                    >
                      Order Now
                    </button>
                    </Link>
  
                    </div>
                  </div>
                  <table className="plant-page-phone" id = "details">
                    <colgroup>
                        <col style={{width: "50%", paddingRight: "10%"}}></col>
                        <col style={{float: "right"}}></col>
                    </colgroup>
                    <tr style={{ marginBottom: "1%" }}>
                        <td style={{fontWeight: "bold"}}>
                            Months in bloom:
                        </td>
                        <td>
                            {details?.hasOwnProperty("bloom") && details.bloom.map((month)=> {return (details.bloom.indexOf(month) != details.bloom.length - 1) ? `${month}, ` : `${month}`})}
                        </td>
                    </tr>
                    <tr style={{ marginBottom: "1%" }}>
                        <td style={{fontWeight: "bold"}}>
                            Soil moisture:
                        </td>
                        <td>
                            {details?.hasOwnProperty("soil_moisture") && details.soil_moisture.map((moisture)=> {return (details.soil_moisture.indexOf(moisture) != details.soil_moisture.length - 1) ? `${moisture}, ` : `${moisture}`})}
                        </td>
                    </tr>
                    <tr style={{ marginBottom: "1%" }}>
                        <td style={{fontWeight: "bold"}}>
                            Sun exposure:
                        </td>
                        <td>
                            {details?.hasOwnProperty("sun_exposure") && details.sun_exposure.map((exposure) => {return ((details.sun_exposure.indexOf(exposure) != details.sun_exposure.length - 1) ? `${exposure}, `: `${exposure}`)})}
                        </td>
                    </tr>
                </table>
                </div>
              </div>
            </div>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </body>
    </div>
  )
}

export const getServerSideProps = async ({ params: { slug }}) => {
    const query = `*[_type == "plant" && slug.current == '${slug}'][0]`
    const plantsQuery = '*[_type == "plant"]'

    const plants = await client.fetch(plantsQuery);
    const plant = await client.fetch(query);

    return {
        props: { plant, plants }
    }
}
export default plantPage