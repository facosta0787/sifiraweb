import React, { Component } from 'react';
import Menu from './Menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../shared/redux/actions';

class Head extends Component {
  handleClick = e => {
    let menu = document.getElementsByTagName('nav');
    if (this.props.menuClose) {
      menu[0].classList.remove('menu-is-close');
      menu[0].classList.add('menu-is-open');
      this.props.actions.setMenuClose(false);
    } else {
      menu[0].classList.remove('menu-is-open');
      menu[0].classList.add('menu-is-close');
      this.props.actions.setMenuClose(true);
    }
  };

  render() {
    return (
      <header>
        <div className="container">
          <div className="menu-bar">
            <a className="bt-menu" onClick={this.handleClick}>
              <i className="fa fa-bars" aria-hidden="true" />
              &nbsp;&nbsp;&nbsp;SIFIRA WEB
            </a>
          </div>
          <Menu handleOpenCloseMenu={this.handleClick} />
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuClose: state.menuClose
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Head);
