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
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { DateTime } from "luxon";


const CheckoutPage = () => {
  const { totalPrice, totalQuantities, cartItems, setShowCart, onRemove, incQty, decQty, toggleCartItemQty, addCustomerInfo } = useStateContext();
  const google_maps_api = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    const [showAddressInfo, setShowAddressInfo] = useState(true);
    const [deliveryDistance, setDeliveryDistance] = useState(0);
    const [shippingCost, setShippingCost] = useState(0)
    const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null)
    const [selectedDeliveryDates, setSelectedDeliveryDates] = useState([])
    const [selectedPickUpDates, setSelectedPickUpDates] = useState([])
    const [selectedPickUpDate, setSelectedPickUpDate] = useState(null)
    const [stripeAddress, setStripeAddress] = useState({})
    const [name, setName] = useState("")
    const [phone, setPhone] = useState(null)
    const [singleDelivery, setSingleDelivery] = useState(null)
    const [earliestCommonDate, setEarliestDate] = useState("")
    const [dateCategories, setDateCategories] = useState([])
    const [separatedCart, setSeparatedCart] = useState({})
    const sepCart = {}
    const tomorrow = new Date(DateTime.now().ts + 86400000)
    useEffect(() => {
      var ecd = 0
      var differentDates = []
      cartItems.map((item) => {
        if(DateTime.fromISO(item.availability_window[0]).ts > ecd) {
          ecd = DateTime.fromISO(item.availability_window[0]).ts
        }
        if (differentDates.includes(item.availability_window[0]) == false) {
          differentDates.push(item.availability_window[0])
        }
        differentDates.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        if (differentDates.length == 1) {
          setSingleDelivery(true)
        }
      setEarliestDate(DateTime.fromMillis(ecd).toFormat('yyyy LLL dd'))
      setDateCategories(differentDates)
      })
    }, [cartItems])
    const filterDay = (day) => {
        return (date) => {
            return date.getDay() === day;
        }
    }
    const handleDeliveryDateChange = (date) => {
      setSelectedDeliveryDate(date)
    }
    const handleDeliveryDatesChange = (date, index) => {
        var newDates = selectedDeliveryDates
        newDates[index] = date
        setSelectedDeliveryDates([...newDates])
      }
    const handlePickUpDatesChange = (date, index) => {
        var newDates = selectedPickUpDates
        newDates[index] = date
        setSelectedPickUpDates([...newDates])
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
    const handlePhone = (number) => {
      setPhone(number)
    }
    const handleName = (e) => {
      setName(e.target.value)
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
            address: stripeAddress,
            delivery: deliveryDistance ? Math.round((deliveryDistance / 1609)) : null,
            deliveryQty: singleDelivery ? 1 : selectedDeliveryDates.length
        }),
        });
        if(response.statusCode === 500) return;

        const data = await response.json()

        toast.loading('Redirecting...');
        addCustomerInfo({
        name: (showAddressInfo ? stripeAddress.name : name),
        phoneNumber: phone,
        pickupDate: selectedPickUpDate,
        pickupDates: selectedPickUpDates,
        deliveryDate: selectedDeliveryDate,
        deliveryDates: selectedDeliveryDates,
        deliveryAddress: stripeAddress,
        delivery: showAddressInfo,
        singleDeliveryPickup: singleDelivery,
        separatedCart: singleDelivery == false ? sepCart : null
        })
    
        stripe.redirectToCheckout({ sessionId: data.id })
      }
      const removeDuplicates = (a) => {
        var seen = {}
        var filteredArray = []
        a.map((item) => {
          if(!seen[item.name]) {
            filteredArray.push(item)
          }
          seen[item.name] = true
        })
        return filteredArray
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
                                <FontAwesomeIcon classname = "cart" icon = {faShoppingBasket} color = "rgba(0, 0, 0, 0.5)" outline = "2px solid black"/>
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
                                        {item.variety && <h6 style={{height: "25px"}}>Var: {item.variety}</h6>}
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
              Your delivery charge is ${Math.round((deliveryDistance / 1609))} based on your location
            </h6> : null}
            {showAddressInfo ? 
            <>
            {(dateCategories.length > 1) && 
            <>
            <h5>
              Delivery Options
            </h5>
              <div class="form-check">
              <input class="form-check-input" type="radio" name="deliveryOptions" id="singleDelivery" value="delivery" checked={singleDelivery} onChange={()=> {setSingleDelivery(true)}}/>
              <label class="form-check-label" for="singleDelivery">
                  Single Delivery once entire order is available
              </label>
              </div>
              <div class="form-check">
              <input class="form-check-input" type="radio" name="deliveryOptions" id="stagedDelivery" value="delivery" checked={singleDelivery == false} onChange={()=> {setSingleDelivery(false)}}/>
              <label class="form-check-label" for="stagedDelivery">
                  Select separate delivery dates
              </label>
              </div></>
              }
              <h5>
              Delivery Date{singleDelivery == false && 's'}
            </h5>
            {singleDelivery && <DatePicker filterDate={filterDay(5)} selected={selectedDeliveryDate} onChange={(date) => handleDeliveryDateChange(date)} minDate={(tomorrow.valueOf() > new Date(earliestCommonDate).valueOf()) ? tomorrow : new Date(earliestCommonDate)} maxDate={new Date('06/30/2023')}/>}
            {singleDelivery == false &&
            <>
            { dateCategories.map((date, i) => {
              sepCart[i] = []
              var nextDay = ""
              var index = dateCategories.indexOf(date)
              if (i == dateCategories.length - 1) {
                nextDay = "2023-06-23"
              } else {
                nextDay = dateCategories[dateCategories.indexOf(date) + 1]
              }
              return <div className="row" style={{borderBottom: '1px dashed black', paddingBottom: '20px', marginBottom: '10px'}}>
              <ul className="col-6">
                {removeDuplicates(cartItems).map((item) => {
                  if(DateTime.fromISO(item.availability_window[0]).ts - DateTime.fromISO(date).ts >= 0 && DateTime.fromISO(item.availability_window[0]).ts - DateTime.fromISO(nextDay).ts < 0) {
                    sepCart[i].push({
                      name: item.name,
                      variety: item.hasOwnProperty('variety') ? item.variety: null,
                      option: item.option,
                      qty: item.quantity
                    })
                    return <li>{item.name}</li>
                  }
                })}
              </ul>
              <div className="col-6">
                <h7>Date</h7>
                <DatePicker filterDate={filterDay(5)} selected={selectedDeliveryDates[index]} onChange={(date) => handleDeliveryDatesChange(date, index)} minDate={(tomorrow.valueOf() > new Date(date).valueOf()) ? tomorrow : new Date(date)} maxDate={new Date(nextDay)}/>
              </div>
            </div>
            })
            }
            </>  
            }
            </>
            : 
            <>
            <h5>
              Contact Information
            </h5>
            <div class="mb-3">
              <label for="name" class="form-label"style = {{color: '#666'}}>Full name</label>
              <input onChange={handleName} type="text" class="form-control" id="name" style={{marginBottom: '15px'}} />
              <label for="phone" class="form-label"style = {{color: '#666'}}>Phone Number (optional)</label>
              <PhoneInput
               country={'us'}
               value={phone}
               onChange={handlePhone}
               id="phone"
              />
            </div>
            {dateCategories.length > 1 &&
            <><h5>
              Pick Up Options
            </h5>
              <div class="form-check">
              <input class="form-check-input" type="radio" name="deliveryOptions" id="singleDelivery" value="delivery" checked={singleDelivery} onChange={()=> {setSingleDelivery(true)}}/>
              <label class="form-check-label" for="singleDelivery">
                  Pick up one time when entire order is available
              </label>
              </div>
              <div class="form-check">
              <input class="form-check-input" type="radio" name="deliveryOptions" id="stagedDelivery" value="delivery" checked={singleDelivery == false} onChange={()=> {setSingleDelivery(false)}}/>
              <label class="form-check-label" for="stagedDelivery">
                  Select separate pick up days
              </label>
              </div></>}
            <h5>
              Pick Up Date{singleDelivery == false && 's'}
            </h5>
            {singleDelivery && <DatePicker filterDate={filterDay(6)} selected={selectedPickUpDate} onChange={(date) => handlePickUpDateChange(date)} minDate={tomorrow} maxDate={new Date('06/30/2023')}/>}
            {singleDelivery == false &&
            <>
            {
              dateCategories.map((date, i) => {
              sepCart[i] = []
              var nextDay = ""
              var index = dateCategories.indexOf(date)
              if (i == dateCategories.length - 1) {
                nextDay = "2023-06-23"
              } else {
                nextDay = dateCategories[dateCategories.indexOf(date) + 1]
              }
              return <div className="row" style={{borderBottom: '1px dashed black', paddingBottom: '20px', marginBottom: '10px'}}>
              <ul className="col-6">
                {removeDuplicates(cartItems).map((item) => {
                  if(DateTime.fromISO(item.availability_window[0]).ts - DateTime.fromISO(date).ts >= 0 && DateTime.fromISO(item.availability_window[0]).ts - DateTime.fromISO(nextDay).ts < 0) {
                    sepCart[i].push({
                      name: item.name,
                      variety: item.hasOwnProperty('variety') ? item.variety: null,
                      option: item.option,
                      qty: item.quantity
                    })
                    return <li>{item.name}</li>
                  }
                })
                }
              </ul>
              <div className="col-6">
                <h7>Date</h7>
                <DatePicker filterDate={filterDay(6)} selected={selectedPickUpDates[index]} onChange={(date) => handlePickUpDatesChange(date, index)} minDate={(tomorrow.valueOf() > new Date(date).valueOf()) ? tomorrow : new Date(date)} maxDate={new Date(nextDay)}/>
              </div>
            </div>
            })}
            </>  
            }
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