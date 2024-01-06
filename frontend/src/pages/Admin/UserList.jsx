import {useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import {toast} from 'react-toastify'
import {  
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} from '../../redux/api/usersApiSlice'
import Message from './Message'
import AdminMenu from './AdminMenu'

const UserList = () => {
  const [userDetails, setUserDetails] = useState({
    userId: null,
    name: '',
    email: ''
  })

  const handleOnChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setUserDetails(prev => (
      {...prev, [name]: value}
    ))
  }

  const {data: users, refetch, isLoading, error} = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  useEffect(() => {
    refetch()
  },[refetch])

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure?')) {
      try {
        await deleteUser(id)
      } catch (error) {
        console.error(error)
        toast.error(error?.data?.error)
      }
    }
  }

  const toggleUpdate = (userId, name, email) => {
    setUserDetails({ userId,name,email })
  }

   const handleUpdate = async() => {
     try {
      await updateUser(userDetails)
      setUserDetails({
        userId: null,
        name: '',
        email: '',
      })
      refetch()
     } catch (error) {
      console.error(error)
      toast.error(error?.data?.error)
     }
   }

  return (
    <div>
      <AdminMenu />
      <div>
        <h1>Users</h1>
        {isLoading ? (
          'Loading'
        ) : error ? (
          <Message>{error?.data.error}</Message>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                </tr>
              </thead>
              <tbody>
                {users?.users?.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>
                      {userDetails.userId === user._id ? (
                        <div>
                          <input
                            type="text"
                            name="name"
                            value={userDetails.name}
                            onChange={handleOnChange}
                          />
                          <button onClick={() => handleUpdate()}>
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p>{user.name} </p>
                          <button
                            onClick={() =>
                              toggleUpdate(user._id, user.name, user.email)
                            }
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      {userDetails.userId === user._id ? (
                        <div>
                          <input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleOnChange}
                          />
                          <button onClick={() => handleUpdate(user._id)}>
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p>{user.email} </p>
                          <button
                            onClick={() =>
                              toggleUpdate(user._id, user.name, user.email)
                            }
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      {user.isAdmin ? (<FaCheck />) : (<FaTimes />)}
                    </td>
                    <td>
                      {!user.isAdmin && (
                        <div>
                          <button onClick={() => handleDelete(user._id)}>
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserList