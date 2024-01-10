import Header from "../components/Header"
import { Link, useParams } from "react-router-dom"
import { useGetProductsQuery } from "../redux/api/productApiSlice"
import Message from "./Admin/Message"
import Loader from "../components/Loader"
import Product from "./Products/Product"

const Home = () => {
  const { keyword } = useParams()
  const { data, isLoading, isError} = useGetProductsQuery({ keyword })
  console.log(data)
  return (
    <div>
        {!keyword ? <Header /> : null}
        {isLoading ? <Loader />: isError ? (<Message>
            {isError?.data?.error || isError?.error}
        </Message>) : (
            <>
                <div className="home">
                    <h1>Special Products</h1>
                    <Link to='/shop'>
                        Shop
                    </Link>
                    <div>
                        {data.products.map((product) => (
                            <div key={product._id}>
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )}
    </div>
  )
}

export default Home