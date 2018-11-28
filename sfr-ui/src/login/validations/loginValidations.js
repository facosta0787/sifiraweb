import jwtdecode from 'jwt-decode'
import moment from 'moment'

export const isTokenExpired = (token) => {
  const user = jwtdecode(token)
  const { exp } = user;
  const diff = moment(exp * 1000).diff(moment(), 'seconds')
  if(diff > 0) {
    return false
  }
  localStorage.removeItem('token')
  return true
}