import { useStateContext } from "../context/StateContext";
import { useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import toast from 'react-hot-toast'
import { urlfor } from "../LIB/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faX } from "@fortawesome/free-solid-svg-icons";
import getStripe from "../LIB/getStripe";
const Cart = () => {
  const { totalPrice, totalQuantities, cartItems, setShowCart, onRemove, incQty, decQty, toggleCartItemQty } = useStateContext();
  console.log(cartItems)
  const cartRef = useRef()

  const handleCartClose = () => {
    setShowCart(false)
    cartItems.map((item) => {
      if(item.quantity == 0) {
        onRemove(cartItems.indexOf(item), 0)
      }
    })
  }
  return (
    <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        </Head>
                    <div className="cart-wrapper" ref={cartRef}>
                        <div className="cart-container">
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
                                              <td className="qty-selector"><button style={{color: "white", marginRight: "7.5px"}} onClick={() => toggleCartItemQty(item._id, "dec", item.option)}>-</button>{item.quantity}<button style={{color: "white", marginLeft: "7.5px"}} onClick={() => toggleCartItemQty(item._id, 'inc', item.option)}>+</button></td>
                                            </tr>
                                          </table>
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
                              <div className="subtotal">
                                <h2>Subtotal</h2>
                                <h3 style={{padding: '0', paddingRight: '20px'}}>${totalPrice}.00</h3>
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