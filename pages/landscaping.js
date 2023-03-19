import Head from "next/head"
import {client} from '../lib/client'

const landscaping = () => {
  return (
    <div>
         <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        </Head>
        <body>
            <div className="landscaping-body">
                <h2>
                    Landscaping and Garden Services
                </h2>
                <h3>
                    Start your garden with Paul's Plant Starts
                </h3>
                <div className="can-cannot">
                    <div className="can-do">
                        <h4>What I can do</h4>
                        <ul>
                            <li>No-till gardens</li>
                            <li>Custom raised beds</li>
                            <li>Plant my plants for you</li>
                            <li>Put up fencing</li>
                        </ul>
                    </div>
                    <div className="cannot-do">
                        <h4>Limitations</h4>
                        <ul>
                            <li>I do not own a tiller or other machinery</li>
                            <li>Will not do conventional landscaping with non-native plants</li>
                        </ul>
                    </div>
                </div>
                <div className="description">
                    <p style={{fontWeight: "600"}}>
                        Looking to plant a rain garden? Always wanted a raised bed?
                    </p>
                    <p style={{maxWidth: "750px"}}>
                        I'd love to make it happen for you. You will probably end up with some free plants as a bonus. I can take over as much or as little of your garden as you like. Call or text +1 (734)417-9715 or email paulsplantstarts@gmail.com. 
                        I charge 50¢/mile driving and $20/hour labor
                    </p>
                </div>
                <div className="images">
                    <div>
                        <img src="/static/IMG_0618.jpeg" />
                        <h3>$350</h3>
                    </div>
                    <div>
                        <img src="/static/IMG_0566.jpeg" />
                    </div>
                </div>

            </div>
        </body>
    </div>
  )
}
export const getServerSideProps = async () => {
    const query = '*[_type == "plant"]'
    const plants = await client.fetch(query);
  
    const bannerQuery = '*[_type == "banner"]'
    const bannerData = await client.fetch(bannerQuery);
  
    return {
      props: {plants, bannerData}
    }
  }
export default landscaping