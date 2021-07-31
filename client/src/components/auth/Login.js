import { useState } from 'react'

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    errors: {},
  })

  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const { email, password } = loginInfo
    const user = { email, password }
    console.log(user)
  }

  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <p className='lead text-center'>
              Sign in to your DevConnector account
            </p>
            <form onSubmit={submitHandler}>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control form-control-lg'
                  placeholder='Email Address'
                  name='email'
                  value={loginInfo.email}
                  onChange={changeHandler}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control form-control-lg'
                  placeholder='Password'
                  name='password'
                  value={loginInfo.password}
                  onChange={changeHandler}
                />
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
