import { useState, useEffect } from 'react'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  })

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setUserDetails(prev => {
        return {...prev, [name]: value}
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await login(userDetails).unwrap()
        console.log(res)
        dispatch(setCredentials({ ...res }))
    } catch (error) {
        console.error(error)
        toast(error?.data?.error)
    }
    
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, {isLoading}] = useLoginMutation()
  const { userInfo } = useSelector(state => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
        navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  return (
    <div>
      <section>
        <div>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={userDetails.email}
                onChange={handleOnchange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={userDetails.password}
                onChange={handleOnchange}
              />
            </div>
            <button disabled={isLoading} type='submit'>
                {isLoading ?"Loggin in" : "Log in" }
            </button>
            {isLoading && "Loading"}
          </form>
          <div>
            <p>New Customer ? {" "}</p>
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login