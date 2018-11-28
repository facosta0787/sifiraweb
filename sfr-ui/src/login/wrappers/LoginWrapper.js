import { connect } from 'react-redux';
import Login from '../components/LoginForm';
import { setTokenUser } from '../../shared/redux/actions'

const mapStateToProps = (state) => {
  const { token, user } = state
  return {
    token,
    user
  }
}

const mapDispatchToProps = (dispach) => {
  return {
    actions: {
      setTokenUser: (username, password) => dispach(setTokenUser(username, password))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
