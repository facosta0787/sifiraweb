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
import { Card } from 'semantic-ui-react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      data: {},
      errorMessage: null
    };
  }

  componentDidMount() {
    const { params } = this.props.match
    if(!isEmpty(params)) {
      const { dni } = params
      this.handleGetInvoices(dni);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const { history } = this.props;
    const { elements: { searcher: { value : dni } } } = form;
    history.push(`/${dni}`)
  };

  handleGetInvoices = (dni) => {
    const { actions: setAppLoading, user: { perfil }} = this.props;
    const { apiUrl } = window;
    setAppLoading(true);
    axios.get(`http://${apiUrl}/api/invoices/${dni}/${perfil}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(response => {
      if(isEmpty(response.data.invoices)) {
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
  }

  render() {
    const { isLoading } = this.props;
    const { errorMessage } = this.state;
    const { customer, invoices } = this.state.data;
    if (isLoading) return <Spinner />
    return (
      <div>
        <h2 style={{ margin: '80px 0 0 0', padding: '0' }}>Facturas Cliente</h2>
        <SearchForm
          placeholder={'Cedula del cliente'}
          labelButton="Buscar"
          width={this.state.width}
          onSubmit={this.handleSubmit}
        />
        <p style={styles.errorMessage}>{errorMessage}</p>
        {
          customer &&
          <Card fluid={this.state.width < 768 ? true : false}>
            <Card.Content
              header={customer.Nombre}
              meta={'Cedula: ' + customer.Cedula}
              style={{ fontSize: '0.85rem' }}
            />
            <Card.Content style={{ fontSize: '0.85rem' }}>
              <Card.Description>
                <strong>Tel1: </strong>
                {customer.Tel1}&nbsp;
                <strong>Tel2: </strong>
                {customer.Tel2}
              </Card.Description>
              <Card.Description>
                <strong>Tel3: </strong>
                {customer.Tel3}&nbsp;
                <strong>Tel4: </strong>
                {customer.Tel4}
              </Card.Description>
            </Card.Content>
          </Card>
        }


        {invoices && <TableResults data={invoices} /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));

const styles = {
  errorMessage: {
    color: 'red',
    fontSize: '0.9em',
  }
}