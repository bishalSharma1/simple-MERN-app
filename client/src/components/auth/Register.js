import { useState } from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { registerUser } from '../../actions/authActions' //import action

const Register = () => {
  const [registerInput, setRegisterInput] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    errors: {},
  })

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setRegisterInput({ ...registerInput, [name]: value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const { name, email, password, confirm } = registerInput
    const user = { name, email, password, confirm }

    dispatch(registerUser(user))
  }

  const state = useSelector((state) => state)
  useEffect(() => {
    setRegisterInput({ ...registerInput, errors: state.errors })
  }, [state.errors])
  const { errors } = registerInput

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your People account</p>
            <form noValidate onSubmit={submitHandler}>
              <div className='form-group'>
                <input
                  type='text'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name,
                  })}
                  placeholder='Name'
                  name='name'
                  value={registerInput.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <div className='invalid-feedback'>{errors.name}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email,
                  })}
                  placeholder='Email Address'
                  name='email'
                  value={registerInput.email || ''}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className='invalid-feedback'>{errors.email}</div>
                )}
                <small className='form-text text-muted'>
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password,
                  })}
                  placeholder='Password'
                  name='password'
                  value={registerInput.password || ''}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className='invalid-feedback'>{errors.password}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.confirm,
                  })}
                  placeholder='Confirm Password'
                  name='confirm'
                  value={registerInput.confirm || ''}
                  onChange={handleChange}
                />
                {errors.confirm && (
                  <div className='invalid-feedback'>{errors.confirm}</div>
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

export default Register
