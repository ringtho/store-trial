import ProductCarousel from "../pages/Products/ProductCarousel"
import SmallProduct from "../pages/Products/SmallProduct"
import { useGetTopProductsQuery } from "../redux/api/productApiSlice"
import './Header.scss'

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery()
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <h1>Error Loading Top Products</h1>
  }
  return (
    <div>
        <div>
            <div className="header">
                {data.map((product) => (
                    <div key={product._id}>
                        <SmallProduct product={product} />
                    </div>
                ))}
            </div>
        </div>
        <ProductCarousel />
    </div>
  )
}

export default Header