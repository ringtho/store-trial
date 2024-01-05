import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
    useCreateProductMutation, 
    useUploadProductImageMutation 
} from "../../redux/api/productApiSlice"
import { useFetchAllCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from 'react-toastify'
import './ProductList.scss'

const ProductList = () => {
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    brand: '',
    stock: 0
  })

  const navigate = useNavigate()
  const [createProduct] = useCreateProductMutation()
  const [uploadProductImage] = useUploadProductImageMutation()
  const { data: categories} = useFetchAllCategoriesQuery()

  const handleUploadFile = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
        const res = await uploadProductImage(formData).unwrap()
        toast.success(res.msg)
        setImage(res.image)
        setImageUrl(res.image)
    }catch (error) {
        toast.error(error?.data?.error || error.error)
    }
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setProductDetails(prev => ({...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('image', image)
      productData.append('name', productDetails.name)
      productData.append('description', productDetails.description)
      productData.append('price', productDetails.price)
      productData.append('category', productDetails.category)
      productData.append('quantity', productDetails.quantity)
      productData.append('brand', productDetails.brand)
      productData.append('countInStock', productDetails.stock)

      const { data } = await createProduct(productData)
      console.log(data)
      if(data?.error) {
        toast.error('Product create failed. Try again')
      } else {
        toast.success(`${data?.product.name} is created`)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      toast.error('Product create failed. Try again')
    }

  }

  return (
    <div>
      <div>
        <div>Create Product</div>
        {imageUrl && (
          <div className="img">
            <img src={imageUrl} alt="product" />
          </div>
        )}

        <div className="image_container">
          <label>
            {image ? image.name : 'Upload Image'}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleUploadFile}
            />
          </label>
        </div>

        <div>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              value={productDetails.name}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <br />
            <input
              type="number"
              name="price"
              id="price"
              value={productDetails.price}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <br />
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={productDetails.quantity}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="name">Brand</label>
            <br />
            <input
              type="text"
              name="brand"
              id="brand"
              value={productDetails.brand}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="name">Description</label>
            <br />
            <textarea
              type="text"
              name="description"
              id="description"
              value={productDetails.description}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label htmlFor="stock">Count In Stock</label>
            <br />
            <input
              type="text"
              name="stock"
              id="stock"
              value={productDetails.stock}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="name">Category</label>
            <br />
            <select placeholder="Choose category" name="category" onChange={handleOnChange}>
                { categories?.categories?.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ProductList