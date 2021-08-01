//Register

//action is a simple function that returns an object

import { history } from '../App'

import axios from 'axios'

import GET_ERRORS from './types'

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
