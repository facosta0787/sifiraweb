import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import queryString from '../shared/utils/query-string';
import isEmpty from 'lodash/isEmpty';
import { setAppLoading } from '../shared/redux/actions';
import Spinner from '../shared/components/spinner';
import SearchForm from '../components/SearchForm';
import TableResults from '../components/TableResults';

class Prices extends Component {
  constructor(props){
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const { search } = this.props.location;
    const { ref, desc } = queryString.parse(search);
    if(!isEmpty(ref) || !isEmpty(desc)){
      this.handleGetStock(ref, desc)
    }
  }

  handleSubmit = (e) => {
    const { history } = this.props;
    const params = Array.from(e.target.querySelectorAll('#searcher'));
    const [ ref, desc ] = params
    history.push(`/prices?ref=${ref.value}&desc=${desc.value}`)
  }

  handleGetStock = (ref, desc) => {
    const { setAppLoading } = this.props.actions;
    const { idAlmacen } = this.props.user;
    setAppLoading(true);
    const { apiUrl } = window
    axios.get(`http://${apiUrl}/api/stock?ref=${ref}&desc=${desc}&idStore=${idAlmacen}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(({ data }) => {
      if(isEmpty(data)) {
        this.setState({
          errorMessage: 'Error: No se encontraron datos'
        })
      } else {
        this.setState({
          data: data.map(item => {
            const { Saldo, ...stockItem } = item
            return stockItem;
          }),
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
  }

  render() {
    const { isLoading } = this.props;
    const { data } = this.state;
    if (isLoading) return <Spinner />
    return (
      <React.Fragment>
        <h2 style={{ margin: '80px 0 0 0', padding: '0' }}>Lista de Precios</h2>
        <SearchForm
          placeholder={'Referencia'}
          labelButton="Buscar"
          onSubmit={this.handleSubmit}
          alternateCriteria={{ placeholder: 'Descripción' }}
        />
        <TableResults data={data} />
      </React.Fragment>
    );
  }
}


const mapStateToProps = ({ isLoading }) => ({
  isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  actions: { setAppLoading: bindActionCreators(setAppLoading, dispatch) },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Prices));
