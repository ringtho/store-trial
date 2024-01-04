import { toast } from 'react-toastify'
import {
    useCreateCategoryMutation,
    useFetchAllCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation
} from '../../redux/api/categoryApiSlice'
import { useState } from 'react'
import CategoryForm from '../../components/CategoryForm'

const CategoryList = () => {
  const { data } = useFetchAllCategoriesQuery()
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [updateName, setUpdateName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleCreateCategory = async (e) => {
    e.preventDefault()

    if (!name) {
      toast.error('Category name is required')
      return
    }

    try {
        const res = await createCategory({ name }).unwrap()
        console.log(res)
        if (res.error) {
            toast.error(res.error)
        } else {
            setName('')
            toast.success(`${res.category.name} is created`)
        }
    } catch (error) {
        console.error(error)
        toast.error('Creating category failed, try again!')
    }
  }

  return (
    <div>
      <div>Manage Catagories</div>
      <CategoryForm
        value={name}
        setValue={setName}
        handleSubmit={handleCreateCategory}
      />
      <br />
      <hr />
      <div>
        {data?.categories?.map((category) => (
          <div key={category._id}>
            <button onClick={() => {
                setModalVisible(true)
                setSelectedCategory(category)
                setUpdateName(category.name)
            }}>{category.name}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryList