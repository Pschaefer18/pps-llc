import Head from "next/head"
import {client} from '../LIB/client'

const about = () => {
  return (
    <div>
         <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        </Head>
        <body>
            <div className="about-body">
            <img src="/static/IMG_0458.jpeg"></img>

                <p className="intro">
                    Paul's Plant Starts is a backyard nursery offering native perennials and garden vegetables. My goal is to fill the increasing demand of gardeners with quality transplants at the best value I can offer. I don’t have an organic certification, however all my practices fit the organic requirements. The plants receive small doses of fish emulsion, but nothing more. I’m strongly in favor of starting gardens and would love to work with you to make it happen. See <a className="landscaping-link" style={{textDecoration: "none", color: "gray", fontWeight: "bold" }} href="/landscaping">Landscaping</a> for details.
                </p>
                <h2>About Vegetable Gardening</h2>
                <p>
                    Our food system has never been more fragile than it is today. Dependencies like fuel, fertilizer, and supply chain logistics combined with top soil erosion and overall nutrient depletion are all the reason to start getting your hands dirty in the garden if you haven’t already. Will you be growing all your own food? …probably not, but you’ll be a step ahead of most people. Keep in mind, home gardening can be just as unforgiving as it is rewarding. In your first year, the deer will likely destroy everything you do. However, you shouldn’t let that stop you. Put up a taller fence and try again. There’s nothing like having fresh fruits and vegetables that you grew yourself.
                </p>
                <img style={{float: "left"}} src="/static/rose_milkweed_01.jpg"></img>

                <h2>About Native Plants</h2>
                <p>
                    Most plants found on suburban properties today provide very little function other than a visual appeal. I encourage everyone with a yard to plant native species. They play an essential role in our local ecosystems and look beautiful as well. If you’re looking to attract birds and don’t want to spend a small fortune on birdseed each year, try some native perennials. Native plant species are the food of butterfly and moth larvae which are the food of baby birds. By providing the most basic level in the food web, you’ll be fostering an entire ecosystem in your own yard. Wildlife will surprise you with its ability to return when these plants are present.
                </p>
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
export default about