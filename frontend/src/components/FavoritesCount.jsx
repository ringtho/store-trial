import { useSelector } from "react-redux"

const FavoritesCount = () => {
  const favorites = useSelector(state => state.favorites)
  const favoritesCount = favorites.length
  return (
    <>
        {favoritesCount > 0 && (
            <span> ({favoritesCount})</span>
        )}
    </>
  )
}

export default FavoritesCount