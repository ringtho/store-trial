import Header from "./components/Header"
import { Link, useParams } from "react-router-dom"
import { useGetProductsQuery } from "./redux/api/productApiSlice"
import Message from "./pages/Admin/Message"

const Home = () => {
  const { keyword } = useParams()
  const { data, isLoading, isError} = useGetProductsQuery()
  return (
    <div>
        {!keyword ? <Header /> : null}
    </div>
  )
}

export default Home