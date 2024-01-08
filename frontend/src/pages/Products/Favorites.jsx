import { useSelector } from "react-redux"
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice"
import Product from '../Products/Product'


const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct)
  
  return (
    <div>
        <h1>FAVORITE PRODUCTS</h1>
        <div>
            {favorites.map((product) => (
                <Product  product={product} key={product._id} />
            ))}
        </div>
    </div>
  )
}

export default Favorites