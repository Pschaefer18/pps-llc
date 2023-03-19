import Link from "next/link"
import { urlfor } from "../LIB/client"
const Searchcard = ({plant}) => {
  return (
    <a style={{textDecoration: "none"}} href={`/plant/${plant.slug.current}`}>
        <div class="search-card card mb-3" style={{maxWidth: "540px", maxHeight:"100px"}}>
          <div class="row g-0">
            <div class="col-md-4">
              <img src={urlfor(plant.image[0])} style={{width: "100px"}}class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{plant.name}</h5>
                <p class="card-text"><small class="text-muted">${plant.pricing_options[0].price}.00 {(plant.pricing_options.length > 1) && (` - $${(plant.pricing_options[plant.pricing_options.length - 1].price)}.00`)}</small></p>
              </div>
            </div>
          </div>
        </div>    
    </a>
  )
}
export default Searchcard