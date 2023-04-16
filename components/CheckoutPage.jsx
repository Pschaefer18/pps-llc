import React, { useState, useEffect } from "react";
import { Elements, AddressElement } from "@stripe/react-stripe-js";
import getStripe from "../LIB/getStripe"
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { urlfor } from "../LIB/client";
import toast from "react-hot-toast"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const CheckoutPage = () => {
  const { totalPrice, totalQuantities, cartItems, setShowCart, onRemove, incQty, decQty, toggleCartItemQty } = useStateContext();    const google_maps_api = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    const [showAddressInfo, setShowAddressInfo] = useState(true);
    const [deliveryDistance, setDeliveryDistance] = useState(0);
    const [shippingCost, setShippingCost] = useState(0)
    const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null)
    const [selectedPickUpDate, setSelectedPickUpDate] = useState(null)
    const [stripeAddress, setStripeAddress] = useState({})
    const filterDay = (day) => {
        return (date) => {
            return date.getDay() === day;
        }
    }
    const handleDeliveryDateChange = (date) => {
      setSelectedDeliveryDate(date)
    }
    const handlePickUpDateChange = (date) => {
        setSelectedPickUpDate(date)
      }
  
    const handleMethodChange = (event) => {
      if (event.target.value == "delivery") {
        setShowAddressInfo(true);
      }
      else {
        setShowAddressInfo(false);
        setDeliveryDistance(0)
      }
    }
    const handleAddressChange = async (event) => {
      if (event.complete) {
        const address = event.value.address
        const destination = `${address.line1}, ${address.city}, ${address.state}, ${address.postal_code}`
        const response = await fetch(`/api/googleMaps?destination=${destination}`)
        const data = await response.json()
        console.log(data)
        setDeliveryDistance(data.routes[0].legs[0].distance.value)
        setStripeAddress(event.value)
        console.log(event.value)
      }
    }
    const handleStripe = async () => {
        const stripe = await getStripe();
        const response = await fetch('/api/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cartItems: cartItems,
            address: stripeAddress
        }),
        });
        if(response.statusCode === 500) return;

        const data = await response.json()

        toast.loading('Redirecting...');
    
        stripe.redirectToCheckout({ sessionId: data.id })
      }
    console.log(cartItems)
    return (
      <>
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
                              <div className="checkout-product-container">
                                {cartItems.map((item) => {
                                  return (
                                  <div class="card mb-3" style={{maxWidth: "540px"}}>
                                  <div class="row g-0">
                                    {console.log(item)}
                                    <div class="col-md-4">
                                      <img src={urlfor(item?.image[0])} class="img-fluid rounded-start" alt/>
                                    </div>
                                    <div class="col-md-8">
                                      <div class="card-body checkout-card">
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
                <div className="subtotal checkout-subtotal">
                  <h2>Subtotal</h2>
                  <h3 style={{padding: '0', paddingRight: '20px'}}>${totalPrice}.00</h3>
              </div>
            </div>
          </div>
          <div className="order-form">
            <form>
              <h5>
                Delivery Method
              </h5>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="delivery" checked={showAddressInfo} onChange={handleMethodChange}/>
            <label class="form-check-label" for="flexRadioDefault1">
                Deliver to my address ($1 per mile)
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="pick-up" checked={!showAddressInfo} onChange={handleMethodChange}/>
            <label class="form-check-label" for="flexRadioDefault2">
                Pick-Up at Farmington Farmers Market
            </label>
            </div>
            {showAddressInfo && <><h5>
                Delivery Address
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
              </Elements> </>}
              {deliveryDistance ? <h6>
              Your delivery charge is ${Math.round((deliveryDistance / 1609))}
            </h6> : null}
            {showAddressInfo ? 
            <>
            <h5>
              Delivery Date
            </h5> 
            <DatePicker filterDate={filterDay(5)} selected={selectedDeliveryDate} onChange={handleDeliveryDateChange} />
            </>
            : 
            <>
            <h5>
              Pick Up Date
            </h5> 
            <DatePicker filterDate={filterDay(6)} selected={selectedPickUpDate} onChange={handlePickUpDateChange} />
            </>}
            <div class="d-grid gap-2">
              <button onClick={handleStripe} class="btn checkout-button" type="button">Complete Checkout w/ Stripe</button>
            </div>
            </form>
          </div>
        </div>
      </>
    )
  }
export default CheckoutPage