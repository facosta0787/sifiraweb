import React, { Component } from 'react';
import isNil from 'lodash/isNil';
import { Redirect } from 'react-router';
import jwt from 'jwt-decode'
import { isTokenExpired } from '../../../login/validations/loginValidations';

export default (WrappedComponent) => {
  return class AuthRoute extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isAuthenticated: false,
        props: {}
      }
    };

    componentWillMount() {
      const token = localStorage.getItem('token');
      if(!isNil(token)) {
        if(!isTokenExpired(token)) {
          return this.setState(() => ({
            isAuthenticated: true,
            props: { ...this.props, user: jwt(token) }
          }));
        }
        alert('Su sesión ha expirado, por favor inicie sesión nuevamente');
      }
    };

    render() {
      const { isAuthenticated, props } = this.state;
      return isAuthenticated ? <WrappedComponent {...props} /> : <Redirect to="/login" />;
    };
  }
}