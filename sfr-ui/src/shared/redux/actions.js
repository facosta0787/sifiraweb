import axios from 'axios';
import jwt from 'jwt-decode'

// Action Creators
export function setMenuClose(isClose) {
  return {
    type: 'SET_MENU_STATE',
    payload: isClose
  };
}

export function setAppLoading(loading) {
  return {
    type: 'SET_APP_LOADING',
    payload: loading,
  };
}

function receiveTokenUser(token) {
  return {
    type: 'SET_TOKEN_USER',
    token
  }
}

function receiveUserData(user) {
  return {
    type: 'SET_USER_DATA',
    user
  }
}

function removeTokenUser() {
  return {
    type: 'REMOVE_TOKEN_USER'
  }
}

//Actions
export const setTokenUser = (username, password) => (dispatch) => {
  axios.post('http://localhost:3000/auth/login',{
    username,
    password
  })
  .then((response) => {
    const { token } = response.data
    dispatch(receiveTokenUser(token))
    dispatch(receiveUserData(jwt(token)))
    return true
  })
  return false
}

export default {
  setMenuClose,
  setAppLoading,
  setTokenUser,
  removeTokenUser,
};
