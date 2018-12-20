import React, { Component } from 'react';
import { Form, Table, Button, Input, TextArea } from 'semantic-ui-react';
import Calendar from 'react-input-calendar';
import axios from 'axios';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import Values from '../cash/components/Values';
import { number } from '../shared/utils/stringFormats';


import './Cash.css';

const DATE_FORMAT = 'YYYYMMDD';

class Cash extends Component {
  state = {
    data: {
      cash: {},
      cashDetails: null,
      observaciones: '',
      new: true
    },
    inputCalendarValue: moment().format(DATE_FORMAT),
    isButtonSaveDisable: true
  }

  componentDidMount() {
    const today = moment().format(DATE_FORMAT);
    this.fetchCash(today)
  }

  fetchCash = (date) => {
    const { idAlmacen } = this.props.user
    const { apiUrl } = window
    axios.get(`http://${apiUrl}/api/cash/null/${idAlmacen}/${date}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(response => {
      this.setState({ data: response.data})
    })
  }

  handleSubmitForm = (e) => {
    e.preventDefault()
    const { data } = this.state
    console.log(JSON.stringify(data, null, 2))
  }

  handleClickCalculate = (e) => {
    e.preventDefault()
    const { cash, cashDetails } = this.state.data;
    const { apiUrl } = window
    axios.post(`http://${apiUrl}/api/cash/calculate`,
    { cash, cashDetails },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      console.log(response.data)
      this.setState({
        data: {
          ...this.state.data,
          cash: {
            ...this.state.data.cash,
            ...response.data,
          }
        }
      }, () => this.setState({ isButtonSaveDisable: false }))
    })
  }

  handleCalendarChange = (date) => {
    if( this.state.inputCalendarValue !== date ) {
      this.setState({
          inputCalendarValue: date
        },
        this.fetchCash(date)
      );
    }
  }

  handleInputChange = (e) => {
    const { id, value } = e.target;
    const cashDetails  = [ ...this.state.data.cashDetails ]
    const detail = cashDetails.find( item => item.idConcepto === parseInt(id, 10))
    detail.valor = parseInt(value.toString().replace(/,/gi, ''), 10) || 0;
    this.setState({
      data: {
        ...this.state.data,
        cashDetails,
      },
    });
  }

  handleObservationChange = (e) => {
    const { value } = e.target
    this.setState({
      data: {
        ...this.state.data,
        cash: {
          ...this.state.data.cash,
          observaciones: value,
        }
      }
    })
  }

  render() {
    const { inputCalendarValue, isButtonSaveDisable, data: { new: isNew } } = this.state;
    const { cash ,cashDetails } = this.state.data;
    const {
      estado,
      observaciones,
    } = cash;

    return (
      <div style={{ marginTop: '80px' }}>
        <h2>Cuadre Caja Diario</h2>
        <div
          style={{
            marginBottom: 8,
            display: 'flex',
            justifyContent: 'flex-end',
            maxWidth: 800,
          }}>
            <Input type="text" size="mini" value={this.props.user.name} readOnly style={{ flexGrow: 1, marginRight: 3 }}/>
            <Calendar
              format={DATE_FORMAT}
              date={inputCalendarValue}
              computableFormat={DATE_FORMAT}
              onChange={this.handleCalendarChange}
              inputFieldClass='input-date-calendar'
              openOnInputFocus
              closeOnSelect
              todayText='Hoy'
              locale='es'
              readOnly
            />
            <Button onClick={this.handleClickCalculate} type='submit' size="tiny" primary disabled={!isNew}>Calcular</Button>
            <Button onClick={this.handleSubmitForm} type='submit' size="tiny" primary disabled={isButtonSaveDisable}>Guardar</Button>
        </div>
        { !isEmpty(cash) &&
          <Values data={cash}/>
        }
        { cashDetails &&
          <Form size='mini' onSubmit={this.onSubmit} autoComplete="off" style={{ marginBottom: 10 }}>
            <Table celled striped compact
                  size='small'
                  color='black'
                  style={{ maxWidth: 800 }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        Concepto
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        Valor
                      </Table.HeaderCell>
                      { Boolean(estado) &&
                        <Table.HeaderCell>
                          Valor Verificado
                        </Table.HeaderCell>
                      }
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {cashDetails &&
                      cashDetails.map(concepto => {
                        return(
                          <Table.Row key={concepto.idConcepto}>
                            <Table.Cell>{concepto.Concepto}</Table.Cell>
                            <Table.Cell>
                              <Form.Input
                                id={concepto.idConcepto}
                                value={number(concepto.valor)}
                                onChange={this.handleInputChange}
                                autoComplete="off"
                                // readOnly={ concepto.hasOwnProperty('valorV') ? true : false }
                                readOnly={!isNew}
                              />
                            </Table.Cell>
                            { concepto.hasOwnProperty('valorV') &&
                              <Table.Cell>
                                <Form.Input
                                  id={concepto.idConcepto}
                                  value={number(concepto.valorV)}
                                  onChange={this.handleChange}
                                  autoComplete="off"
                                  readOnly
                                />
                              </Table.Cell>
                            }
                          </Table.Row>
                        )
                      })
                    }
                  </Table.Body>
            </Table>
          </Form>
        }
        { !isEmpty(cash) &&
          <TextArea
            onChange={this.handleObservationChange}
            value={observaciones || 'Observaciones:'}
            autoHeight
            style={{
              minHeight: 80,
              width: 800,
              padding: '2px 5px',
              border: '1px solid #DFE0E0',
              borderRadius: 2,
              fontSize: '0.8em',
              outline: 'none',
              marginBottom: 50,
            }}
          />
        }
      </div>
    )
  }

}

export default Cash;
