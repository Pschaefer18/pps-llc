import { useEffect } from "react"
import { useStateContext } from "../context/StateContext"
import {ordersRef, db } from "../pages/api/firebase"
import { push, set, get, ref} from "firebase/database"
import Head from 'next/head'
import {DateTime} from 'luxon'

const success = () => {
    const now = DateTime.now();
    const date = now.toLocaleString(DateTime.DATETIME_MED)
    console.log(date)
    const {customerInfo, cartItems, setCartItems} = useStateContext()
    const shortenedCart = []
    cartItems.map((item) => {
      shortenedCart.push({
        name: item.name,
        option: item.option,
        qty: item.quantity
      })
    })
    useEffect(() => {
        if (customerInfo.name && cartItems.length > 0) {
          push(ordersRef, {
          name: customerInfo.name,
          phoneNumber: customerInfo.phoneNumber,
          pickupDate: (customerInfo.pickupDate ? DateTime.fromISO(customerInfo.pickupDate.slice(0, customerInfo.pickupDate.search('T'))).toLocaleString(DateTime.DATE_MED) : null),
          deliveryDate: (customerInfo.deliveryDate ? DateTime.fromISO(customerInfo.deliveryDate.slice(0, customerInfo.deliveryDate.search('T'))).toLocaleString(DateTime.DATE_MED) : null),
          delivery: customerInfo.delivery,
          deliveryAddress: customerInfo.deliveryAddress,
          breakdown: shortenedCart,
          // orderedAt: date
          })
          console.log("pushed")
          const updateInventory = async () => {
            cartItems.map(async(item) => {
              const itemRef = ref(db, `/Inventory/${item.name}/${item.option}s`)
              const currentValueSnapShot = await get(itemRef, '/')
              const currentValue = currentValueSnapShot.val()
              set(itemRef, currentValue - item.quantity)
              if (item.option == "Four pack") {
                const itemRef = ref(db, `/Inventory/${item.name}/Eight packs`)
                const currentValueSnapShot = await get(itemRef, '/')
                const currentValue = currentValueSnapShot.val()
                set(itemRef, currentValue - item.quantity/2)
              }
              if (item.option == "Eight pack") {
                const itemRef = ref(db, `/Inventory/${item.name}/Four packs`)
                const currentValueSnapShot = await get(itemRef, '/')
                const currentValue = currentValueSnapShot.val()
                set(itemRef, currentValue - item.quantity * 2)
              }
            })
          }
          updateInventory()
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
          <h5>Your plants will be delivered on {DateTime.fromISO(customerInfo.deliveryDate.slice(0, customerInfo.deliveryDate.search('T'))).toLocaleString(DateTime.DATE_MED)}</h5>}

          {customerInfo.delivery == false && 
          <h5>Your plants will be ready for pickup on {DateTime.fromISO(customerInfo.pickupDate.slice(0, customerInfo.pickupDate.search('T'))).toLocaleString(DateTime.DATE_MED)} at the Farmington Farmers Market between 9am and 2pm</h5>}
        </div>
      </body>
    </>
  )
}
export default success