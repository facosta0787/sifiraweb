import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class TableResults extends Component {
  handleRowClick = (data) => {
    const { history } = this.props;
    history.push(`/${data}`);
  };

  render() {
    const data = this.props.data;
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    const { style:styleProp , clickable } = this.props;
    return (
      <div>
        {data && data.length > 0 && (
          <Table
            celled
            striped
            compact
            size="small"
            color="black"
            style={styleProp}
            selectable={clickable ? true : false}
          >
            <Table.Header>
              <Table.Row>
                {headers.map((header, index) => (
                  <Table.HeaderCell key={index}> {header}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((factura, index) => {
                let arr = Object.values(factura);
                return (
                  <Table.Row
                    key={index}
                    onClick={clickable ? () => this.handleRowClick(arr[2]) : null }
                    style={clickable ? styles : {}}
                  >
                    {arr.map((value, index) => {
                      return <Table.Cell key={index}>{value}</Table.Cell>;
                    })}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </div>
    );
  }
}

export default TableResults;

TableResults.defaultProps = {
  data: [],
  style: {},
  clickable: false,
}

const styles = {
  cursor: 'pointer',
}