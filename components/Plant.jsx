import Image from 'next/image'
import { urlfor } from '../LIB/client'
import Link from 'next/link'

const Plant = ({ plant: {image, name, variety, features, pricing_options, scientific_name, slug} }) => {
  return (
    <div>
      <Link href={`plant/${slug.current}`}>
          <div className="plant card bg-dark text-white">
            <img src={urlfor(image[0])} className="card-img" alt="..."/>
            <div id="bootstrap-override" className="card-img-overlay">
                <h5 className="plant-title card-title">{name}{variety && ` (${variety})`}</h5>
                <div className="plant-icons">
                {features && features.map((img) => {
                        return (
                            <img src={urlfor(img)} width="55px" height="55px"/>
                        )
                      })}
                </div>
            </div>
          </div>
      </Link>
    </div>
  )
}
export default Plant