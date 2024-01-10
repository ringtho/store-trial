import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../Admin/Message"
import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa"
import './ProductCarousel.scss'

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000
  }
  return (
    <div>
      {isLoading ? null : error ? (
        <Message>{error?.data.error}</Message>
      ) : (
        <Slider {...settings} className="carousel_container">
          {products.map((product) => (
            <div key={product._id}>
              <img
                src={product.image}
                alt={product.name}
                className="carousel_image"
              />
              <div>
                <div>
                  <h2>{product.name}</h2>
                  <p>UGX {product.price}</p> <br />
                  <br />
                  <p>{product.description.substring(0, 170)}...</p>
                </div>
                <div>
                  <div className="product_details">
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
                    <div className="product_details">
                      <h1>
                        <FaStar /> Ratings: {Math.round(product.rating)}
                      </h1>
                      <h1>
                        <FaShoppingCart /> Quantity: {product.quantity}
                      </h1>
                      <h1>
                        <FaBox /> In Stock: {product.countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default ProductCarousel