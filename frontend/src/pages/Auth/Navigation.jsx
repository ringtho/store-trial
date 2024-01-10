import './Navigation.scss'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShopping } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { logout } from '../../redux/features/auth/authSlice'
import FavoritesCount from '../../components/FavoritesCount'

const Navigation = () => {

  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)

  const { userInfo } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

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
          <span className="nav_item nav-item-name">Home</span>
        </Link>
        <Link to="/shop" className="nav_link">
          <AiOutlineShopping className="nav_icon" size={26} />
          <span className="nav_item nav-item-name">Shop</span>
        </Link>
        <Link to="/cart" className="nav_link">
          <AiOutlineShoppingCart className="nav_icon" size={26} />
          <span className="nav_item nav-item-name">Cart</span>
          {cartItems.length > 0 && (<span>({cartItems.length})</span>)}
        </Link>
        <Link to="/favorites" className="nav_link">
          <FaHeart className="nav_icon" size={26} />
          <span className="nav_item nav-item-name">Favorites</span>
          <FavoritesCount />
        </Link>
      </div>

      <div>
        <button onClick={toggleDropDown}>
          {userInfo ? <span>{userInfo?.user.name}</span> : <></>}
        </button>
        {userInfo?.user && dropDownOpen && (
          <ul>
            {userInfo.user.isAdmin && (
              <>
                <li>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/admin/categorylist">Category</Link>
                </li>
                <li>
                  <Link to="/admin/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/admin/userlist">Users</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/login" onClick={logoutHandler}>
                LogOut
              </Link>
            </li>
          </ul>
        )}
      </div>

      {!userInfo?.user && (
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
      )}
    </div>
  )
}

export default Navigation