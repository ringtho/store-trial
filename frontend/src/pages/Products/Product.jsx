import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Product.scss'
import HeartIcon from './HeartIcon'


const Product = ({ product }) => {
  return (
    <div>
      <div>
        <img src={product.image} alt={product.name} className="product_image" />
        <HeartIcon product={product} />
      </div>
      <div>
        <Link to={`/product/${product._id}`}>
          <h2>
            <div>{product.name}</div>
            <span>UGX {product.price}</span>
          </h2>
        </Link>
      </div>
    </div>
  )
}

Product.propTypes = {
    product: PropTypes.object
}

export default Product