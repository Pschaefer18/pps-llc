const Homepage = () => {
  return (
    <div className="homepage">
        <div className="homepage-body">
          <div className="homepage-section">
            <div>
              <img src="/static/IMG_0527_square.jpeg"/>
            </div>
            <div className="homepage-text">
            <p>
                High quality plants that you can trust!
              </p>
              <p>
                Located between Dexter & Ann Arbor
              </p>
              <p>
                Specializing in Native Perennials
              </p>
              {/* <p>
                Order anytime for delivery or pickup at the Farmington Farmers Market
              </p> */}
              <button><a style={{textDecoration: 'none', color: 'black'}} href="/about">See 'About'</a></button>
            </div>
          </div>
          <div className="homepage-section">
            <div>
            <div className="product-examples">
              <table>
                <tr>
                  <td></td>
                  <td><img src="https://i.imgur.com/xa7qIqP.jpg" alt="" /></td>
                  <td><img src="https://i.imgur.com/0PPOpuT.jpg" alt="" /></td>
                  <td><img src="https://i.imgur.com/7iyrmev.jpg" alt="" /></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Single</td>
                  <td>4-Pack</td>
                  <td>8-Pack</td>
                </tr>
                <tr>
                  <td>Veggies</td>
                  <td>$3</td>
                  <td>$5</td>
                  <td>$8</td>
                </tr>
                <tr>
                  <td>Natives</td>
                  <td>$4</td>
                  <td>$6</td>
                  <td>$10</td>
                </tr>
              </table>
            </div>
            </div>
            <div style={{display: 'flex'}}>
              <img className= "img_2"src="/static/IMG_0522_square.jpeg" alt="" />
            </div>
          </div>
          <div className="homepage-section">
            <div className="flip-section-order-1">
              <img src="/static/IMG_0455_square.jpeg" alt=""/>
            </div>
            <div>
            <h2 className="bulk-discounts">Bulk Discounts <br /> <p className="mix-match">Mix & Match</p></h2>
            <div className="product-examples">
              <table>
                <tr>
                  <td></td>
                  <td><img src="https://i.imgur.com/xa7qIqP.jpg" alt="" /></td>
                  <td><img src="https://i.imgur.com/0PPOpuT.jpg" alt="" /></td>
                  <td><img src="https://i.imgur.com/7iyrmev.jpg" alt="" /></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Singles Flat (18)</td>
                  <td>Celled<br/> 24-pack</td>
                  <td>Celled<br/> 48-pack</td>
                </tr>
                <tr>
                  <td>Veggies</td>
                  <td>$40</td>
                  <td>$20</td>
                  <td>$35</td>
                </tr>
                <tr>
                  <td>Natives</td>
                  <td>$54</td>
                  <td>$30</td>
                  <td>$50</td>
                </tr>
              </table>
            </div>
            </div>
            <div className="flip-section-order-2">
              <img src="/static/IMG_0455_square.jpeg" alt=""/>
            </div>
          </div>
          <div className="homepage-section">
            <div className="homepage-text">
              <p style={{textAlign: 'center'}}>
                Garden/Landscaping service: $20/hour
              </p>
              <p style={{textAlign: 'center'}}>
                4x8 Raised Bed with soil: $350
              </p>
              <button><a style={{textDecoration: 'none', color: 'black'}} href="/landscaping"> see 'Landscaping' </a></button>
            </div>
            <div>
              <img src="/static/IMG_0618.jpeg"/>
            </div>
          </div>
        </div>
    </div>
  )
}
export default Homepage