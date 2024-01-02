import { useState, useEffect } from 'react'
import {Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../redux/features/auth/authSlice'
import {toast} from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setUserDetails(prev => (
        {...prev, [name]: value }
    ))
  }

  console.log(userDetails)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector( state => state.auth )

  const [register, {isLoading}] = useRegisterMutation()

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userDetails.password !== userDetails.confirmPassword) {
        toast.error('Passwords do not match')
    } else {
        try {
            const res = await register(userDetails).unwrap()
            dispatch(setCredentials({...res}))
            navigate(redirect)
            toast.success('User finally registered')
        } catch(error) {
            console.error(error)
            toast.error(error.data.error)
        }
    }
  }

  useEffect(() => {
    if (userInfo?.user) {
        navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  return (
    <section>
      <div>
        <h1>REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              placeholder="John Doe"
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              placeholder="Johndoe@gmail.com"
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userDetails.password}
              placeholder="********"
              onChange={handleOnchange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userDetails.confirmPassword}
              placeholder="********"
              onChange={handleOnchange}
            />
          </div>
          <button disabled={isLoading} type="submit">
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          {isLoading && 'Loading'}
        </form>
        <div>
          <p>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register