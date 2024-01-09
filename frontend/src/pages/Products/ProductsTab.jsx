import { useState } from 'react'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice'
import SmallProduct from './SmallProduct'
import Loader from '../../components/Loader'

const ProductsTab = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading} = useGetTopProductsQuery()
  const [activeTab, setActiveTab] = useState(1)

  if (isLoading) {
    return <Loader />
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber)
  }

  return (
    <div>
      <section>
        <div
          onClick={() => handleTabClick(1)}
          style={{ fontWeight: activeTab === 1 ? 'bold' : 'normal' }}
        >
          Write Your Review
        </div>
        <div
          onClick={() => handleTabClick(2)}
          style={{ fontWeight: activeTab === 2 ? 'bold' : 'normal' }}
        >
          All Reviews
        </div>
        <div
          onClick={() => handleTabClick(3)}
          style={{ fontWeight: activeTab === 3 ? 'bold' : 'normal' }}
        >
          Related Products
        </div>
      </section>
      <section>
        {activeTab === 1 && (
          <div>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="rating">Rating</label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" disabled={loadingProductReview}>
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login">sign in</Link> to write a review
              </p>
            )}
          </div>
        )}
      </section>
      <section>
        {activeTab === 2 && (
          <div>
            <div>
              {product.reviews.length === 0 && (
                <p>No reviews for this product</p>
              )}
            </div>
            <div>
                {product.reviews.map((review) => (
                    <div key={review._id}>
                        <div>
                            <strong>{review.name}</strong>
                            <p>{review.createdAt.substring(0, 10)}</p>
                        </div>
                        <p>{review.comment}</p>
                        <Ratings value={review.rating} />
                    </div>
                ))}
            </div>
          </div>
        )}
      </section>
      <section>
        {activeTab === 3 && (
            <section>
                {!data ? (
                    <Loader />
                ): (
                    data.map((product) => (
                        <div key={product._id}>
                            <SmallProduct product={product} />
                        </div>
                    ))
                )}

            </section>
        )}
      </section>
    </div>
  )
}

export default ProductsTab