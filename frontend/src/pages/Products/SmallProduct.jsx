import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import HeartIcon from "./HeartIcon"

const SmallProduct = ({ product }) => {
  return (
    <div>
        <div>
            <img className="img" src={product?.image} alt={product.name} />
            <HeartIcon product={product} />
            <div>
                <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                    <span>UGX {product.price}</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

SmallProduct.propTypes = {
    product: PropTypes.object
}

export default SmallProduct