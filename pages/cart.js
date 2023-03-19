import { useStateContext } from "../context/StateContext";
import Head from "next/head";
const Cart = () => {
  const { cartItems } = useStateContext();

  return (
    <>
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        </Head>
        <body style = {{paddingTop: "3vw"}}>
            {console.log(cartItems)}
            <div className="cart-body">
                <div className="shopping-cart">
                    <h2>Shopping Cart</h2>
                    {cartItems.map((item) => {
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
                    })}
                </div>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                </div>
            </div>
        </body>
    </>
  )
}
export default Cart