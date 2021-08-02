import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../validators/isEmpty'

const initialState = {
  isAuthenticated: false,
  user: {},
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload, //contains decoded data
      }
    default:
      return state
  }
}

//reducer is returning an object which is the state
