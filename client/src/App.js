import './App.css'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import isEmpty from './validators/isEmpty'

export const history = createBrowserHistory()

function App() {
  const jwtToken = localStorage.getItem('jwtToken')
  if (!isEmpty(jwtToken)) {
    const decoded = jwtDecode(jwtToken)
    setAuthToken(jwtToken)
    store.dispatch(setCurrentUser(decoded))
  }
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className='App'>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className='container'>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
