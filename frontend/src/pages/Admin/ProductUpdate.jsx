import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useGetProductByIdQuery,
} from '../../redux/api/productApiSlice'
import { useFetchAllCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"

const ProductUpdate = () => {
  const params = useParams()

  const { data: productData} = useGetProductByIdQuery(params._id)
  const [image, setImage] = useState(productData?.image || '') 
  const [productDetails, setProductDetails] = useState({
    name: productData?.name || '',
    description: productData?.description || '',
    price: productData?.price || '',
    category: productData?.category || '',
    quantity: productData?.quantity || '',
    brand: productData?.brand || '',
    stock: productData?.countInStock || 0,
  })

  const navigate = useNavigate()
  const { data: categories = [] } = useFetchAllCategoriesQuery()
  const [uploadProductImage] = useUploadProductImageMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  useEffect(() => {
    if (productData && productData._id) {
        setProductDetails({
          name: productData?.name,
          description: productData?.description,
          price: productData?.price,
          category: productData?.category,
          quantity: productData?.quantity,
          brand: productData?.brand,
          stock: productData?.countInStock,
        })
        setImage(productData?.image)
    }
  }, [productData])


  const handleOnChange = (e) => {
    const { name, value } = e.target
    setProductDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleUploadFile = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.msg)
      setImage(res.image)
    } catch (error) {
      toast.error(error?.data?.error || error.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('name', productDetails.name)
      formData.append('description', productDetails.description)
      formData.append('price', productDetails.price)
      formData.append('category', productDetails.category)
      formData.append('quantity', productDetails.quantity)
      formData.append('brand', productDetails.brand)
      formData.append('countInStock', productDetails.stock)
    
      const { data } = await updateProduct({productId: params._id, formData }).unwrap()

      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success(`Product was successfully updated`)
        navigate('/admin/allproductslist')
      }
    } catch (error) {
      console.error(error)
      toast.error('Product update failed. Try again')
    }
  }

  const handleDelete = async () => {
    try {
        let answer = window.confirm('Are you sure you want to delete this product?')
        if (!answer) return

        const { data } = await deleteProduct(params._id).unwrap()
        toast.success(`Successfully deleted ${data?.product?.name}`)
        navigate('/admin/allproductslist')
    } catch (error) {
        console.error(error)
        toast.error('Delete Failed. Try again')
    }
  }

  return (
    <div>
      <AdminMenu />
      <div>
        <div>Create Product</div>
        {image && (
          <div className="img">
            <img src={image} alt="product" />
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
            <select
              placeholder="Choose category"
              name="category"
              onChange={handleOnChange}
            >
              {categories?.categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button onClick={handleSubmit}>Update</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate