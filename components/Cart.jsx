import { useStateContext } from "../context/StateContext";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import toast from 'react-hot-toast'
import { urlfor } from "../LIB/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faX } from "@fortawesome/free-solid-svg-icons";
import getStripe from "../LIB/getStripe";
const Cart = () => {
  const { totalPrice, adjustedPrice, totalQuantities, cartItems, setShowCart, onRemove, incQty, decQty, toggleCartItemQty } = useStateContext();
  console.log(cartItems)
  const cartRef = useRef(null)

  const handleCartClose = () => {
    setShowCart(false)
    cartItems.map((item) => {
      if(item.quantity == 0) {
        onRemove(cartItems.indexOf(item), 0)
      }
    })
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        handleCartClose()
      }
      console.log(cartRef.current.contains(event.target))
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartRef])
  return (
    <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        </Head>
                    <div className="cart-wrapper">
                        <div className="cart-container" ref={cartRef}>
                            <div className="cart-heading">
                              <button 
                                type="button"
                                className="cart-close"
                                onClick={handleCartClose}
                                >
                                <FontAwesomeIcon style={{width: '25px'}} icon = {faX} color = "black" outline = "2px solid black"/>
                              </button>
                            <div className="basket-icon">
                              <FontAwesomeIcon icon = {faShoppingBasket} color = "#000" outline = "2px solid black"/>
                            </div>
                            {(cartItems.length < 1) && (
                              <h5>Your Basket is empty</h5>
                            )}
                            </div>
                            <div className="product-container">
                              {cartItems.map((item) => {
                                return (
                                <div class="card mb-3" style={{maxWidth: "540px", overflowX: "hidden"}}>
                                <div class="row flex-nowrap">
                                  {console.log(item)}
                                  <div class="col-5">
                                    <img src={urlfor(item?.image[0])} class="img-fluid rounded-start" alt/>
                                  </div>
                                  <div class="col-8">
                                    <div class="card-body">
                                      <h5 class="card-title">{item.name}</h5>
                                      {item.variety && <h6 style={{height: "25px"}}>Var: {item.variety}</h6>}
                                      <div className="cart-content">
                                        <div className = "cart-specs">
                                            <div className="row g-0">
                                              <div className="col-4" style={{fontWeight: "600"}}>Type:</div>
                                              <div className="col-8">{item.option}</div>
                                            </div>
                                            <div className="row g-0">
                                              <div className="col-4" style={{fontWeight: "600"}}>Price ea:</div>
                                              <div className="col-8">${item.price}</div>
                                            </div>
                                            <div className="row g-0">
                                              <div className="col-4" style={{fontWeight: "600"}}>Subtotal:</div>
                                              <div className="col-8">${item.price * item.quantity}</div>
                                            </div>
                                            <div className="row g-0">
                                              <div className="qty-selector"><button style={{color: "white", marginRight: "7.5px"}} onClick={() => toggleCartItemQty(item._id, "dec", item.option)}>-</button>{item.quantity}<button style={{color: "white", marginLeft: "7.5px"}} onClick={() => toggleCartItemQty(item._id, 'inc', item.option)}>+</button></div>
                                            </div>
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
                          <div className="order-summary">
                          {(adjustedPrice < totalPrice) && <>
                  <div className="row">
                    <div className="col-8">
                      <h5 style={{textAlign: "left", paddingLeft: '20px'}}>Subtotal</h5>
                    </div>
                    <div className="col-4">
                    <h5 style={{textAlign: "left"}}> ${totalPrice}.00</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <h5 style={{textAlign: "left", paddingLeft: '20px'}}>Discount</h5>
                    </div>
                    <div className="col-4">
                    <h5 style={{color: 'red', textAlign: "left", marginLeft: '-7.5px'}}>-${totalPrice-adjustedPrice}.00</h5>
                    </div>
                  </div> </>}
                  <div className="row">
                    <div className="col-8">
                      <h3 style={{textAlign: "left", padding: "0", paddingLeft: "20px"}}>Total</h3>
                    </div>
                    <div className="col-4">
                    <h3 style={{textAlign: "left", padding: "0"}}>${adjustedPrice}.00</h3>
                    </div>
                  </div>
                              <p style={{textAlign: "center", padding: "10px"}}>
                                Pick-up/delivery dates are selected in checkout
                              </p>
                              <div className="btn-container">
                            <Link href="/checkout">
                            <div class="d-grid gap-2 checkout-btn-container">
                              <button onClick={handleCartClose}class="btn btn-primary" type="button">checkout</button>
                            </div>
                            </Link>
                          </div>
                          </div>
                        </div>
                    </div>
    </>
  )
}
export default Cart