import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from '../../redux/features/favorites/favoriteSlice'
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from '../../utils/localStorage'

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorites) || []
  const isFavorite = favorites.some((p) => p._id === product._id)

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
    dispatch(setFavorites(favoritesFromLocalStorage))
  },[dispatch])

  const toggleFavorites = () => {
    if (isFavorite) {
        dispatch(removeFromFavorites(product))
        // remove product from localstorage
        removeFavoriteFromLocalStorage(product._id)
    } else {
        dispatch(addToFavorites(product))
        //add product to localstorage
        addFavoriteToLocalStorage(product)
    }
  }

  return (
    <div>
      {isFavorite ? (
        <FaHeart onClick={toggleFavorites} />
      ) : (
        <FaRegHeart onClick={toggleFavorites} />
      )}
    </div>
  )
}

HeartIcon.propTypes = {
    product: PropTypes.object
}

export default HeartIcon