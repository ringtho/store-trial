import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice"
import { setCategories, setChecked, setProducts, setRadio } from "../redux/features/shop/shopSlice"
import { useFetchAllCategoriesQuery } from "../redux/api/categoryApiSlice"
import Loader from "../components/Loader"
import ProductsCard from "./Products/ProductsCard"

const Shop = () => {
  const dispatch = useDispatch()
  const {categories, products, checked, radio } = useSelector((state) => state.shop)
  const categoriesQuery = useFetchAllCategoriesQuery()
  const [priceFilter, setPriceFilter] = useState('')
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked, radio
  })

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
        dispatch(setCategories(categoriesQuery.data))
    }
  }, [categoriesQuery, dispatch])

    useEffect(() => {
        if (!checked.length || !radio.length) {
        if (!filteredProductsQuery.isLoading) {
            // Filter products based on checked categories and price filter
            const filteredProducts = filteredProductsQuery.data.filter(
              (product) => {
                return (
                  product.price.toString().includes(priceFilter) ||
                  product.price === parseInt(priceFilter, 10)
                )
              }
            )
            dispatch(setProducts(filteredProducts))
        }
        }
    }, [filteredProductsQuery, dispatch, checked.length, radio.length, priceFilter])

    const handleBrandClick = (brand) => {
        const productByBrand = filteredProductsQuery.data?.filter(
          (product) => product.brand === brand
        )
        dispatch(setProducts(productByBrand))
    }

    const handleCheck = (value, id) => {
        const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id)
        dispatch(setChecked(updatedChecked))
    }

    // Add all Brands option to uniqueBrands
    const uniqueBrands = [
      ...Array.from(
        new Set(
          filteredProductsQuery.data?.map((product) => product.brand)
        .filter((brand) => brand !== undefined))
      ),
    ]

    const handlePriceChange = (e) => {
        setPriceFilter(e.target.value)
    }
  

  return (
    <>
      <div>
        <div>
          <div>
            <h2>Filter By Categories</h2>
            <div>
              {categories?.categories?.map((category) => (
                <div key={category._id}>
                  <input
                    type="checkbox"
                    id="red-checkbox"
                    onChange={(e) =>
                      handleCheck(e.target.checked, category._id)
                    }
                  />
                  <label htmlFor="pink-checkbox">
                    {" "} {category.name}
                  </label>
                </div>
              ))}
            </div>

            {/* // Brands */}
            <div>
                <h2>Filter by Brands</h2>
                <div>
                    {uniqueBrands?.map((brand) => (
                        <>
                            <div>
                                <input type="radio" name="brand" id={brand} onChange={() => handleBrandClick(brand)} />
                                <label htmlFor="pink-radio">{" "}{brand}</label>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <div>
                <h2>Filter by Price</h2>
                <div>
                    <input type="text" placeholder="Enter Price" value={priceFilter} onChange={handlePriceChange} />
                </div>
            </div>
            <div>
                <div>
                    <button onClick={() => window.location.reload()}>
                        Reset
                    </button>
                </div>
            </div>
          </div>
          <div>
            <h2>{products?.length} products</h2>
            <div>
                {products.length === 0 ? (
                    <Loader />
                ): (
                    products?.map((p) => (
                        <div key={p._id}>
                            <ProductsCard p={p}/>
                        </div>
                    ))
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop