import { useEffect, useState } from "react"
import { useStateContext } from "../context/StateContext"
import {ordersRef, db } from "../pages/api/firebase"
import { push, set, get, ref} from "firebase/database"
import getStripe from "../LIB/getStripe"
import Head from 'next/head'
import {DateTime} from 'luxon'

const success = () => {
    const now = DateTime.now();
    const date = now.toLocaleString(DateTime.DATETIME_MED)
    console.log(date)
    const {customerInfo, cartItems, setCartItems} = useStateContext()
    const {email, setEmail} = useState('')
    const shortenedCart = []
    const separatedCart = {}

    const getEmail = async() => {
    const stripe = await getStripe()
    const sessionId = customerInfo.sessionID;
    if (sessionId) {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        return(session.customer_email)
    }
  }

    cartItems.map((item) => {
      shortenedCart.push({
        name: item.name,
        variety: item.hasOwnProperty('variety') ? item.variety: null,
        option: item.option,
        qty: item.quantity
      })
    })
    const toDateString = (date) => {
      console.log(date)
      console.log(DateTime.fromISO('2023-05-06T04:00:00.000Z'.slice(0, '2023-05-06T04:00:00.000Z'.search('T'))).toLocaleString(DateTime.DATE_MED))
      return DateTime.fromISO(date.slice(0, date.search('T'))).toLocaleString(DateTime.DATE_MED)
    }
    const toDateStrings = (dates) => {
      var arr = []
      console.log(dates)
      dates.map(date => arr.push(toDateString(date)))
      console.log(arr)
      return arr
    }
    const handleDateValues = (date) => {
      if (date) {
        if (Array.isArray(date)) {
          console.log('array', date)
          return toDateStrings(date)
        }
        console.log(date)
        return toDateString(date)
      }
      console.log('null')
      return null
    }
    useEffect(() => {
        if (customerInfo.name && cartItems.length > 0) {
          console.log(customerInfo)
          push(ordersRef, {
          name: customerInfo.name,
          phoneNumber: customerInfo.phoneNumber,
          pickupDate: handleDateValues(customerInfo.pickupDate),
          pickupDates: handleDateValues(customerInfo.pickupDates),
          deliveryDate: handleDateValues(customerInfo.deliveryDate),
          deliveryDates: handleDateValues(customerInfo.deliveryDates),
          delivery: customerInfo.delivery,
          deliveryAddress: customerInfo.deliveryAddress,
          breakdown: customerInfo.singleDeliveryPickup ? shortenedCart : customerInfo.separatedCart,
          // orderedAt: date
          })
          console.log("pushed")
          const mapOptionName = (option) => {
            const sanityOptionNames = ["Single", "Four pack", "Eight pack", "Six pack", "Twelve pack"]
            const firebaseOptionNames = ["Singles", "Half packs", "Full packs", "Half packs", "Full packs"]
            return firebaseOptionNames[sanityOptionNames.indexOf(option)]
          }
          const updateInventory = async (item, option_to_check, option_to_update, multiplier) => {
            
              if (item.option == option_to_check) {
                const itemRef = ref(db, `/Inventory/${item.slug.current}/${option_to_update}`)
                const currentValueSnapShot = await get(itemRef, '/')
                const currentValue = currentValueSnapShot.val()
                await set(itemRef, currentValue - item.quantity * multiplier)
              }
          }
          cartItems.forEach(async(item) => {
            await updateInventory(item, item.option, mapOptionName(item.option), 1,)
            await updateInventory(item, "Four pack", "Full packs", 0.5,)
            await updateInventory(item, "Eight pack", "Half packs", 2,)
            await updateInventory(item, "Six pack", "Full packs", 0.5,)
            await updateInventory(item, "Twelve pack", "Half packs", 2,)
          })
        setCartItems([])
    }}, [customerInfo])
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
      </Head>
      <body className="success-body">
        <div className = "success-page">
          {customerInfo.name && <h2>Thank You, {customerInfo.name.slice(0, customerInfo.name.search(" "))}!</h2>}
          <h3>Your order has been placed</h3>
          {customerInfo.delivery && 
          <h5>Your plants will be delivered on {customerInfo.singleDeliveryPickup ?  toDateString(customerInfo.deliveryDate): `${toDateStrings(customerInfo.deliveryDates).join(' and ')}`}<br/>You've been sent a confirmation email of your purchase</h5>}

          {customerInfo.delivery == false && 
          <h5>Your plants will be ready for pickup on {customerInfo.singleDeliveryPickup ?  toDateString(customerInfo.pickupDate): `${toDateStrings(customerInfo.pickupDates).join(' and ')}`} at the Farmington Farmers Market between 9am and 2pm<br/>You've been sent a confirmation email of your purchase</h5>}
        </div>
      </body>
    </>
  )
}
export default success