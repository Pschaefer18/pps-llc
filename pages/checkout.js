import { useState, useEffect } from "react";
import { Elements, AddressElement } from "@stripe/react-stripe-js";
import getStripe from "../LIB/getStripe"
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { urlfor } from "../LIB/client";
import calculateDistance from "./api/googleMaps";
const checkout = () => {
  const { cartItems } = useStateContext()
  const google_maps_api = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const [showAddressInfo, setShowAddressInfo] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });
  const [shippingCost, setShippingCost] = useState(0)
  const handleMethodChange = (event) => {
    if (event.target.value == "delivery") {
      setShowAddressInfo(true);
    }
    else {
      setShowAddressInfo(false);
    }
  }
  const handleAddressChange = (event) => {
    setShippingAddress(event.complete ? event.value : {});
    if (event.complete) {
      const address = event.value.address
      calculateDistance(`${address.line1}, ${address.city}, ${address.state}, ${address.postal_code}`)
    }
  }
  console.log(cartItems)
  return (
    <>
      <Head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
      </Head>
      <div className="checkout">
        <div className="checkout-order-summary">
          <h1>
            Order Summary
          </h1>
          <div className="checkout-order-summary-items">
          {(cartItems.length < 1) ? (
                            <div className="empty-cart">
                              <h3>Your Basket is empty</h3>
                              <FontAwesomeIcon classname = "cart" icon = {faShoppingBasket} color = "rgb(105, 72, 0)" outline = "2px solid black"/>
                            </div>
                          ) : (
                            <div className="product-container">
                              {cartItems.map((item) => {
                                return (
                                <div class="card mb-3" style={{maxWidth: "540px"}}>
                                <div class="row g-0">
                                  {console.log(item)}
                                  <div class="col-md-4">
                                    <img src={urlfor(item?.image[0])} class="img-fluid rounded-start" alt/>
                                  </div>
                                  <div class="col-md-8">
                                    <div class="card-body">
                                      <h5 class="card-title">{item.name}</h5>
                                      <div className="cart-content">
                                        <div className = "cart-specs">
                                          <table>
                                            <colgroup>
                                              <col style={{width: "80px"}}></col>
                                              <col></col>
                                            </colgroup>
                                            <tr>
                                              <td style={{fontWeight: "600"}}>Type:</td>
                                              <td>{item.option}</td>
                                            </tr>
                                            <tr>
                                              <td style={{fontWeight: "600"}}>Price ea:</td>
                                              <td>${item.price}</td>
                                            </tr>
                                            <tr>
                                              <td style={{fontWeight: "600"}}>Subtotal:</td>
                                              <td>${item.price * item.quantity}</td>
                                            </tr>
                                            <tr>
                                              <td className="qty-selector"><button style={{marginRight: "7.5px"}} onClick={() => toggleCartItemQty(item._id, "dec", item.option)}>-</button>{item.quantity}<button style={{marginLeft: "7.5px"}} onClick={() => toggleCartItemQty(item._id, 'inc', item.option)}>+</button></td>
                                            </tr>
                                          </table>
                                        </div>
                                        <div className="cart-plant-features">
                                          {item.features?.map((img) => {
                                            return <img src={urlfor(img)} width="40" alt="" style={{padding: "1px"}}/>
                                          })}
                                        </div>
                                        <span className="cart-remove" onClick={() => onRemove(cartItems.indexOf(item), item.price * item.quantity)}>Remove Item</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              )
                              })}
                            </div>
                          )}
          </div>
        </div>
        <div className="order-form">
          <form>
            <h5>
              Contact Information
            </h5>
            <label for="fullName" class="col-sm-2 col-form-label">Full Name</label>
            <input id="fullName" class="form-control" type="text" placeholder="First and last name" aria-label="default input example" />
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <input id="email" class="form-control" type="text" placeholder="someone@example.com" aria-label="default input example" />
            <h5>
              Delivery Method
            </h5>
          <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="delivery" checked={showAddressInfo} onChange={handleMethodChange}/>
          <label class="form-check-label" for="flexRadioDefault1">
              Deliver to my address (50¢ per mile away from me)
          </label>
          </div>
          <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="pick-up" checked={!showAddressInfo} onChange={handleMethodChange}/>
          <label class="form-check-label" for="flexRadioDefault2">
              Pick-Up at Farmington Market
          </label>
          </div>
          {showAddressInfo && <><h5>
              Address Information
            </h5>
            <Elements stripe={getStripe()}>
              <AddressElement options={{
                mode: 'shipping',
                allowedCountries: ['US'],
                autocomplete: {
                  mode: "google_maps_api",
                  apiKey: 'AIzaSyDOKyq9wR9xhbYmgv9b1IFLrEDFQxYrHSk',
                },
              }}
              onChange={handleAddressChange}
              />
            </Elements></>}
          </form>
        </div>
      </div>
    </>
  )
}

export default checkout;