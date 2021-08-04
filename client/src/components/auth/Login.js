import { useState } from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { loginUser } from '../../actions/authActions' //import action
import { history } from '../../App'

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    errors: {},
  })

  const dispatch = useDispatch()

  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const { email, password } = loginInfo
    const loginData = { email, password }
    dispatch(loginUser(loginData))
  }

  const store = useSelector((store) => store)

  useEffect(() => {
    setLoginInfo((loginInfo) => ({
      ...loginInfo,
      errors: store.errors,
    }))
    if (store.auth.isAuthenticated === true) {
      history.push('/dashboard')
    }
  }, [store])

  const { errors } = loginInfo

  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <p className='lead text-center'>Sign in to your People account</p>
            <form onSubmit={submitHandler}>
              <div className='form-group'>
                <input
                  type='email'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email,
                  })}
                  placeholder='Email Address'
                  name='email'
                  value={loginInfo.email || ''}
                  onChange={changeHandler}
                />
                {errors.email && (
                  <div className='invalid-feedback'>{errors.email}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password,
                  })}
                  placeholder='Password'
                  name='password'
                  value={loginInfo.password || ''}
                  onChange={changeHandler}
                />
                {errors.password && (
                  <div className='invalid-feedback'>{errors.password}</div>
                )}
              </div>
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
