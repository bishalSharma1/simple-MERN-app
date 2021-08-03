import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logUserOut } from '../../actions/authActions'
import { history } from '../../App'

const Navbar = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { auth } = state

  const logoutClickHandler = (e) => {
    e.preventDefault()
    dispatch(logUserOut())
    console.log(auth)
    history.push('/login')
  }

  const guestLinks = (
    <ul className='navbar-nav mr-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='register'>
          Sign Up
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='login'>
          Login
        </Link>
      </li>
    </ul>
  )

  const authLinks = (
    <ul className='navbar-nav me-auto'>
      <li className='nav-item'>
        <li className='nav-item'>
          <img
            className='rounded-circle'
            src={auth.user.avatar}
            alt=' gravatar'
            style={{ width: '40px' }}
          />
        </li>{' '}
        <li className='nav-item'>
          <a className='nav-link' href='/#' onClick={logoutClickHandler}>
            Logout
          </a>
        </li>
      </li>
    </ul>
  )

  return (
    <>
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
        <div className='container'>
          <Link className='navbar-brand' to='landing'>
            People
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#mobile-nav'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='profiles'>
                  Developers
                </Link>
              </li>
            </ul>
            {auth.isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
