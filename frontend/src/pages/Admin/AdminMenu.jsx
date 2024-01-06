import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FaTimes } from "react-icons/fa"

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="admin_menu">
      <button onClick={toggleMenu} className="admin_btn">
        {isMenuOpen ? (
          <FaTimes />
        ) : (
          <>
            <div>ADMIN MENU</div>
            <div></div>
            <div></div>
          </>
        )}
      </button>
      {isMenuOpen && (
        <section>
          <ul>
            <li>
              <NavLink
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'black',
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'black',
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'black',
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'black',
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'black',
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? 'greenyellow' : 'black',
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </div>
  )
}

export default AdminMenu