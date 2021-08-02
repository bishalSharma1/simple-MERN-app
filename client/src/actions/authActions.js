//Register

//action is a simple function that returns an object

import { history } from '../App'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'

export const registerUser = (userData) => (dispatch) => {
  axios
    .post('api/users/register', userData)
    .then(history.push('/'))
    .catch((err) => {
      dispatch({
        //from redux thunk
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const loginUser = (userData) => (dispatch) => {
  axios
    .post('api/users/login', userData)
    .then(({ data }) => {
      const { token } = data
      //save to local storage
      localStorage.setItem('jwtToken', token) //localStorage only stores string
      // set token to auth header
      setAuthToken(token)
      //decode token to get user data
      const decoded = jwt_decode(token)
      //set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}
