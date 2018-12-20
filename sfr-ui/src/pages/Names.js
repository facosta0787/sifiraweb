import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { setAppLoading } from '../shared/redux/actions';
import Spinner from '../shared/components/spinner';
import SearchForm from '../components/SearchForm';
import TableResults from '../components/TableResults';
import isEmpty from 'lodash/isEmpty';

class Names extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errorMessage: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { actions: setAppLoading } = this.props;
    setAppLoading(true);
    const form = e.target;
    const { elements: { searcher: { value : name } } } = form;
    const { apiUrl } = window
    axios.get(`http://${apiUrl}/api/names/${name}`,{
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
    })
    .then(response => {
      if(isEmpty(response.data)) {
        this.setState({
          errorMessage: 'Error: No se encontraron datos'
        })
      } else {
        this.setState({
          data: response.data,
          errorMessage: null
        })
      }
      setAppLoading(false);
    })
    .catch(error => {
      const { data } = error.response
      if(data.status === 401) {
        alert('Su sesión ha expirado, por favor inicie sesión nuevamente');
        window.location.assign('/login')
      }
      setAppLoading(false);
    });
  };

  render() {
    const { isLoading, history } = this.props;
    const { data, errorMessage } = this.state;
    if (isLoading) return <Spinner />
    return (
      <div>
        <h2 style={{ margin: '80px 0 0 0', padding: '0' }}>Nombres Clientes</h2>
        <SearchForm
          placeholder={'Nombre a buscar'}
          labelButton="Buscar"
          onSubmit={this.handleSubmit}
        />
        <p style={styles.errorMessage}>{errorMessage}</p>
        { data && <TableResults data={data} clickable history={history} /> }
      </div>
    );
  }
}

const mapStateToProps = ({ isLoading }) => ({
  isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(setAppLoading, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Names));

const styles = {
  errorMessage: {
    color: 'red',
    fontSize: '0.9em',
  }
}