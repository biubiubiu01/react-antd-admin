const SET_TOKEN = 'SET_TOKEN'
const SET_USER_INFO = 'SET_USER_INFO'
import { setCache } from '@/utils/session'

const defaultState = {
  token: null,
  userInfo: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      setCache('TOKEN', action.token)
      return { ...state, token: action.token }
    case SET_USER_INFO:
      return { ...state, userInfo: action.userInfo }
    default:
      return state
  }
}

export const setToken = (token) => {
  return { type: SET_TOKEN, token }
}

export const updateUserInfo = (userInfo) => {
  return { type: SET_USER_INFO, userInfo }
}
