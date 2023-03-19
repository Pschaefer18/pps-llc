import { useStateContext } from "../context/StateContext";
import { useRef } from "react";
import Head from "next/head";
import toast from 'react-hot-toast'
import { urlfor } from "../LIB/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, setShowCart, onRemove, incQty, decQty, toggleCartItemQty } = useStateContext();
  return (
    <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        </Head>
                    <div className="cart-wrapper" ref={cartRef}>
                        <div className="cart-container">
                          <button 
                          type="button"
                          className="cart-heading"
                          onClick={() => {
                            setShowCart(false)
                            cartItems.map((item) => {
                              if(item.quantity == 0) {
                                onRemove(cartItems.indexOf(item), 0)
                              }
                            })
                          }}
                          >
                          Close
                          </button>
                          <span className="heading">Your Cart</span>
                          <span className="cart-num-items">{totalQuantities}</span>
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
                          <div className="order-summary">
                              <h2>Total: {totalPrice}</h2>
                          </div>
                        </div>
                    </div>
                    {/* {cartItems.map((item) => {
                    <div class="card mb-3" style={{maxWidth: "540px"}}>
                        <div class="row g-0">
                          <div class="col-md-4">
                            <img src={urlfor(item.image[0])} class="img-fluid rounded-start" alt="..."/>
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">Card title</h5>
                              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    })} */}
                    
    </>
  )
}
export default Cart