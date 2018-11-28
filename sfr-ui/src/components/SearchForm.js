import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 206
    };
  }

  render() {
    const { placeholder, labelButton, onSubmit, alternateCriteria } = this.props;
    return (
      <div style={style}>
        <Form size="tiny" onSubmit={onSubmit}>
          <Form.Group>
            <Form.Input
              placeholder={placeholder || 'Cedula del cliente'}
              name="searcher"
              autoComplete="off"
              id="searcher"
              style={{ width: `${this.state.width}px` }}
            />
            { alternateCriteria &&
              <Form.Input
                placeholder={alternateCriteria.placeholder || ''}
                name="searcher"
                autoComplete="off"
                id="searcher"
                style={{ width: `${this.state.width}px` }}
              />
            }
            <Form.Button content={labelButton || 'Buscar'} size="tiny" primary/>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SearchForm;

const style = {
  margin: '0px auto 0 auto',
  paddingTop: '10px',
  borderSizing: 'border-box'
};
