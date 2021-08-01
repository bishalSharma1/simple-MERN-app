import './App.css'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

export const history = createBrowserHistory()

function App() {
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
