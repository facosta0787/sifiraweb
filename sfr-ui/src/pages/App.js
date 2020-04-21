import React, { Component } from 'react';
import { withRouter } from 'react-router';
import '../shared/styles/App.css';
import Head from '../components/Head';
import styled from 'styled-components';

const isInLoginRoute = () => {
  const { pathname } = window.location;
  return pathname === '/login';
};

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="App">
        {!isInLoginRoute() && <Head />}
        <Contaider>{children}</Contaider>
      </div>
    );
  }
}

export default withRouter(App);

const Contaider = styled.div`
  width: 95%;
  max-width: 1024px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 98%;
  }
`;
