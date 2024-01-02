import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { useProfileMutation } from '../../redux/api/usersApiSlice'
import {toast} from 'react-toastify'

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  console.log(userDetails)

  const handleOnchange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setUserDetails(prev => (
      {...prev, [name]: value}
    ))
  }
  const { userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [updateProfile, {isLoading: loadingUpdateProfile }] = useProfileMutation()

  useEffect(() => {
    setUserDetails({
      name: userInfo.user.name,
      email: userInfo.user.email,
      password: '',
      confirmPassword: ''
    })
  }, [userInfo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userDetails.password !== userDetails.confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await updateProfile(userDetails).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Successfully updated profile')
      } catch (error) {
        toast.error(error?.data?.error)
      }
    }
  }

  return (
    <div>
      <div>
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name='name'
              placeholder="Enter name"
              value={userDetails.name}
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name='email'
              placeholder="Enter email"
              value={userDetails.email}
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name='password'
              placeholder="Change Password"
              value={userDetails.password}
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name='confirmPassword'
              placeholder="Confirm Password"
              value={userDetails.confirmPassword}
              onChange={handleOnchange}
            />
          </div>
          <div>
            <button type='submit'>Update</button>
            <Link to='/user-orders'>My Orders</Link>
          </div>
        </form>
      </div>
      {loadingUpdateProfile && 'Loading...'}
    </div>
  )
} 

export default Profile