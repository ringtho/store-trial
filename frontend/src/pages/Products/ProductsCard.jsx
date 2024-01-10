import { Link } from "react-router-dom"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/features/cart/cartSlice"
import { toast } from "react-toastify"
import HeartIcon from "./HeartIcon"
import PropTypes from 'prop-types'

const ProductsCard = ({ p }) => {
  const dispatch = useDispatch()

  const addtoCartHandler = (product, qty) => {
    dispatch(addToCart({...product, qty}))
    toast.success('Item successfully added to cart')
  }

  return (
    <div>
      <section>
        <Link to={`/product/${p._id}`}>
          <span>{p?.brand}</span>
          <div>
            <img
              src={p.image}
              alt={p.name}
              style={{ height: '170px', objectFit: 'cover', width: '170px' }}
            />
          </div>
        </Link>
        <HeartIcon product={p} />
      </section>
      <div>
        <div>
            <h5>{p?.name}</h5>
            <p>{p?.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'UGX'
            })}</p>
        </div>
        <p>
            {p?.description?.substring(0,60)}...
        </p>
        <section>
            <Link to={`/product/${p._id}`}>
                Read More
            </Link>
            <button onClick={() => addtoCartHandler(p, 1)}>
                <AiOutlineShoppingCart size={25}/>

            </button>
        </section>
      </div>
    </div>
  )
}

ProductsCard.propTypes = {
    p: PropTypes.object
}

export default ProductsCard