import './Navigation.scss'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShopping } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'

import { Link, useNavigate } from 'react-router-dom'

const Navigation = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  const closeSideBar = () => {
    setShowSideBar(false)
  }
  return (
    <div id="navigation-container">
      <div>
        <Link to="/" className="nav_link">
          <AiOutlineHome className="nav_icon" size={26} />
          <span className="nav_item nav-item-name">HOME</span>
        </Link>
        <Link to="/shop" className="nav_link">
          <AiOutlineShopping className="nav_icon" size={26} />
          <span className="nav_item nav-item-name">SHOP</span>
        </Link>
        <Link to="/cart" className="nav_link">
          <AiOutlineShoppingCart className="nav_icon" size={26} />
          <span className="nav_item nav-item-name">CART</span>
        </Link>
        <Link to="/favorite" className="nav_link">
          <FaHeart className="nav_icon" size={26} />
          <span className="nav_item nav-item-name">FAVORITE</span>
        </Link>
        <ul>
          <li>
            <Link to="/login" className="nav_link">
              <AiOutlineLogin className="nav_icon" size={26} />
              <span className="nav_item nav-item-name">LOGIN</span>
            </Link>
          </li>
          <li>
            <Link to="/register" className="nav_link">
              <AiOutlineUserAdd className="nav_icon" size={26} />
              <span className="nav_item nav-item-name">REGISTER</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation