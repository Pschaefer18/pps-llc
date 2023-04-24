import Link from "next/link"
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Cart } from "./"
import { useStateContext } from "../context/StateContext"
import { useState, useRef, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import {Searchcard} from "./"
import { useRouter } from "next/router"

const Navbar = ({plants}) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()
  const [query, setQuery] = useState("");
  const [queriedPlants, setQueriedPlants] = useState([])
  const [isTypingA, setIsTypingA] = useState(false)
  const [isTypingB, setIsTypingB] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const divRef = useRef(null)
  const searchRef = useRef(null)
  const phoneSearchRef = useRef(null)
  const phoneDivRef = useRef(null)
  const navigate = useRouter()

  useEffect(() => {
    setQueriedPlants(plants.filter(plant=> plant.name.toLowerCase().includes(query)))
  }, [query])
  const onSearch = (event) => {
    const dropdown = event.target.closest('.navbar-collapse');
    dropdown.classList.remove('show');
    navigate.push(`/plants?query=${query}`)
    event.preventDefault()
  }
  const handleFocus = () => {
    setIsTypingA(true)
    setIsTypingB(true)
  }
  const handleMenuClick = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true)
  }
  useEffect(() => {
    showCart ? document.body.style.setProperty("overflow", "hidden")
    : document.body.style.setProperty("overflow", "visible")
  }, [showCart])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target) && !searchRef.current.contains(event.target)) {
        setIsTypingA(false);
      }
      if (phoneDivRef.current && !phoneDivRef.current.contains(event.target) && !phoneSearchRef.current.contains(event.target)) {
        setIsTypingB(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef]);

  const handleDivClick = (event) => {
    event.stopPropagation()
  }
  return (
    <div className="navbar-component">
      {/* {console.log(plants)} */}
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div style={{width: "100%"}}class="container-fluid">
        <img className="logo" src='https://i.imgur.com/GZFz9ge.png' alt="" />
        <div className="center-nav">
            <div className="flex-search-container">
                  <div className="searchbar" ref={searchRef}>
                    <form style={{display: "flex"}} onSubmit={onSearch}>
                      <input style={{width: "400px"}}type="text" placeholder="search plants..." onChange={e=> {setQuery(e.target.value.toLowerCase()); handleFocus(e)}} onFocus={handleFocus} name="query"/>
                      <button style={{width: "60px", color: "rgb(0,100,255)", backgroundColor: "white", border: "none", borderRadius: "0.25em"}}type="submit"><FaSearch/></button>
                    </form>
                  </div>
                  <div onClick={handleDivClick} ref={divRef}>
                  {isTypingA && query ? <div className="list">
                      {queriedPlants.map((plant) => (
                        <Searchcard key={plant._id} plant = {plant} className="listItem" />
                      ))}
                  </div> : null}
                  </div>
              </div>
            <div className="flex-menu-container">
                <div className="menu-buttons">
                  <div className="menu-button"><Link href="/">Home</Link></div>
                  <div className="menu-button"><Link href="/plants">Plants</Link></div>
                  <div className="menu-button"><Link href="/landscaping">Landscaping</Link></div>
                  <div className="menu-button"><Link href="/about">About</Link></div>
                </div>
            </div>
        </div>
        {/* <div className="nav-link account"><Link href="">Create Account</Link> <br /><Link href="">Login</Link></div> */}
        {showCart && <Cart />}
        <div style = {{display: 'flex'}}>
        <div className="shopping-basket nav-link" style= {{width: "fit-content", padding: "0px", margin: "20px"}}><span onClick={() => {setShowCart(true)}}><FontAwesomeIcon classname = "cart" icon = {faShoppingBasket} color = "rgb(105, 72, 0)" outline = "2px solid black"/></span></div>
          <button onClick={handleMenuClick} class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        
{showMenu && 
    <div class="navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/plants">Shop Plants</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/landscaping" tabindex="-1" aria-disabled="true">Landscaping</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about" tabindex="-1" aria-disabled="true">About</a>
        </li>
      </ul>
      <form onSubmit={onSearch} className="d-flex" id="search">
        <input ref={phoneSearchRef} onFocus={handleFocus} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e=> setQuery(e.target.value.toLowerCase())}/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      {query && isTypingB && <div onClick={handleDivClick} ref={phoneDivRef} className="list">
        {plants && queriedPlants.map((plant) => (
          <Searchcard plant = {plant} key={plant.slug.current} className="listItem" />
        ))}
        </div>}
      </div>
      }
    </div>
  </nav>
</div>
  )
}

export default Navbar
