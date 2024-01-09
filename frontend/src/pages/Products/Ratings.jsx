import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"
import PropTypes from 'prop-types'

const Ratings = ({ value, text }) => {
  const fullStars = Math.floor(value)
  const halfStars = value - fullStars > 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStars
  return (
    <div>
      {[...Array(fullStars)].map((_, idx) => (
        <FaStar key={idx} />
      ))}
      {halfStars === 1 && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, idx) => (
        <FaRegStar key={idx} />
      ))}

      <span> {text}</span>
    </div>
  )
}

Ratings.propTypes = {
    value: PropTypes.number,
    text: PropTypes.string 
}

export default Ratings