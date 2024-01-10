import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaTrash } from "react-icons/fa"
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice"
import { productApiSlice } from "../redux/api/productApiSlice"

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)

  const handleOnChange = (product, qty) => {
    dispatch(addToCart({...product, qty}))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <>
      <div>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty, <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div>
              <h1>Shopping Cart</h1>

              {cartItems.map((item) => (
                <div key={item._id}>
                  <div className="img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                    <div>{item.brand}</div>
                    <div>UGX {item.price}</div>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        handleOnChange(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button onClick={() => removeFromCartHandler(item._id)}>
                    <FaTrash /> Remove
                  </button>
                </div>
              ))}

              <div>
                <h2>
                  Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h2>
                <div>
                  UGX{' '}
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.qty,
                    0
                  )}
                </div>
                <button
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart