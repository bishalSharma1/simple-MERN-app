import { useState } from 'react'

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    errors: {},
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRegisterInfo({ ...registerInfo, [name]: value })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    const { name, email, password, confirm } = registerInfo
    const user = { name, email, password, confirm }

    console.log(user)
  }

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your People account</p>
            <form onSubmit={submitHandler}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control form-control-lg'
                  placeholder='Name'
                  name='name'
                  value={registerInfo.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control form-control-lg'
                  placeholder='Email Address'
                  name='email'
                  value={registerInfo.email}
                  onChange={handleChange}
                />
                <small className='form-text text-muted'>
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control form-control-lg'
                  placeholder='Password'
                  name='password'
                  value={registerInfo.password}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control form-control-lg'
                  placeholder='Confirm Password'
                  name='confirm'
                  value={registerInfo.confirm}
                  onChange={handleChange}
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

export default Register
