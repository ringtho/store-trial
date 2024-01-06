import { toast } from 'react-toastify'
import {
    useCreateCategoryMutation,
    useFetchAllCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation
} from '../../redux/api/categoryApiSlice'
import { useState } from 'react'
import CategoryForm from '../../components/CategoryForm'
import Modal from '../../components/Modal'
import AdminMenu from './AdminMenu'

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

  const handleUpdateCategory = async (e) => {
    e.preventDefault()

    if (!updateName) {
        toast.error('Category name is required')
        return
    }

    try {
        const res = await updateCategory({
          categoryId: selectedCategory._id,
          updatedCategory: { name: updateName },
        }).unwrap()
        if (res.error) {
          toast.error(res.error)
        } else {
          toast.success(`${res?.category?.name} is updated`)
          setSelectedCategory(null)
          setUpdateName('')
          setModalVisible(false)
        }
    } catch (error) {
        console.error(error)
        // toast.error('Updating category failed, try again')
    }
  }

  const handleDeleteCategory = async () => {
    try {
        const res = await deleteCategory(selectedCategory._id).unwrap()
        console.log(res)
        if (res.error) {
            toast.error(res.error)
        } else {
            toast.success(`${updateName} was successfully deleted`)
            setSelectedCategory(null)
            // setUpdateName('')
            setModalVisible(false)
        }
    } catch (error) {
        console.error(error)
        toast.error("Category deletion failed, try again")
    }
  }

  return (
    <div>
      <AdminMenu />
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
            <button
              onClick={() => {
                setModalVisible(true)
                setSelectedCategory(category)
                setUpdateName(category.name)
              }}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <CategoryForm
          value={updateName}
          setValue={(value) => setUpdateName(value)}
          handleSubmit={handleUpdateCategory}
          buttonText="Update"
          handleDelete={handleDeleteCategory}
        />
      </Modal>
    </div>
  )
}

export default CategoryList