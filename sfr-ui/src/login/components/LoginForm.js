import React, { Component } from 'react';
import { isNil, isEmpty }from 'lodash';
import { withRouter } from 'react-router-dom';
import { isTokenExpired } from '../validations/loginValidations';
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: false,
    };
  };

  componentWillMount() {
    const token = localStorage.getItem('token');
    if(!isNil(token)) {
      if(!isTokenExpired(token)) {
        const { history } = this.props;
        return history.push('./');
      }
      alert('Su sesión ha expirado, por favor inicie sesión nuevamente');
    }
  };

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if(!isEmpty(user)) {
      const { history } = this.props;
      history.push('./')
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state
    const { setTokenUser } = this.props.actions
    const result = setTokenUser(username, password)
    this.setState(() => ({ error: !result }))
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(state => ({ ...state, [name]: value}) )
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div className="login-form__container">
          <input type="text" value={username} name="username" placeholder="Usuario" autoComplete="off" onChange={this.handleInputChange}/>
          <input type="password" value={password} name="password" placeholder="Password" autoComplete="off" onChange={this.handleInputChange}/>
          {
            error && <p><span className="login-form__error">Lo sentimos, Sifira no reconoce el usuario y la contraseña</span></p>
          }
          <button type="submit">Entrar</button>
          <p><span className="login-form__footer">Medellín - Colombia</span></p>
        </div>
      </form>
    );
  }
}

export default withRouter(LoginForm);
