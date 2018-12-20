import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './shared/redux/store';
import AppRouter from './routes';

window.apiUrl = process.env.REACT_APP_API;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppRouter />
    </Router>
  </Provider>,
  document.getElementById('root')
);

