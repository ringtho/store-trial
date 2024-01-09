import { useState } from "react"
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { toast } from 'react-toastify'
import { useGetProductDetailsQuery , useCreateReviewMutation } from '../../redux/api/productApiSlice'
import Loader from "../../components/Loader"
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa"
import moment from "moment"
import HeartIcon from "./HeartIcon"
import Message from "../Admin/Message"
import './ProductDetail.scss'
import Ratings from "./Ratings"
import ProductsTab from "./ProductsTab"

const ProductDetail = () => {
  const {id: productId } = useParams()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const {data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)
  const { userInfo } = useSelector(state => state.auth)
  const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation()

  const addToCartHandler = () => {

  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
        await createReview({ productId, rating, comment }).unwrap()
        refetch()
        toast.success('Successfully reviewed product')
    } catch (error) {
        toast.error(error?.data?.error || error?.message)
    }
  }

  return (
    <>
      <div>
        <Link to="/">Go Back</Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.error || error.message}</Message>
      ) : (
        <>
          <div>
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="product_img"
              />
              <HeartIcon product={product} />
            </div>
            <div>
              <h2>{product.name}</h2>
              <p style={{ color: '#B0B0B0' }}>{product.description}</p>
              <p>UGX {product.price}</p>
              <div>
                <div>
                  <h1>
                    <FaStore /> Brand: {product.brand}
                  </h1>
                  <h1>
                    <FaClock /> Added: {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1>
                    <FaStar /> Reviews: {product.numReviews}
                  </h1>
                </div>
                <div>
                  <h1>
                    <FaStar /> Ratings: {product.rating}
                  </h1>
                  <h1>
                    <FaShoppingCart /> Quantity: {product.quantity}
                  </h1>
                  <h1>
                    <FaBox /> InStock: {product.countInStock}
                  </h1>
                </div>
              </div>
              <div>
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div>
              <ProductsTab
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetail