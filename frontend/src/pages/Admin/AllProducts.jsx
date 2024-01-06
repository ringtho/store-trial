import { Link } from "react-router-dom"
import moment from 'moment'
import { useAllProductsQuery } from "../../redux/api/productApiSlice"
import AdminMenu from "./AdminMenu"

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery()
  if (isLoading) {
    return <>Loading...</>
  }

  if (isError) {
    return <div>Error Loading Products</div>
  }
  return (
    <div>
        <div>
            <div>All Products ({products?.length})</div>
            <div>
                {products.map((product) => (
                    <Link key={product._id} to={`/admin/product/update/${product._id}`}>
                        <div>
                            <img src={product.image} alt={product.name} className="img" />
                            <div>
                                <div>
                                    <h5>{product?.name}</h5>
                                    <p>{moment(product.createdAt).format("MMMM Do YYYY")}</p>
                                </div>
                                <p>{product?.description?.substring(0, 160)}...</p>
                                <div>
                                    <Link to={`/admin/product/update/${product._id}`} className="btn">Update Product</Link>
                                    <p>UGX {product?.price}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div>
                <AdminMenu />
            </div>
        </div>
    </div>
  )
}

export default AllProducts