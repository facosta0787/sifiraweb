import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../shared/redux/actions'

class Menu extends Component {

  state = {
    isClose:true
  }

  componentDidMount() {
    const elements = Array.from(document.getElementsByClassName('submenu'));
    elements.forEach((elm) => {
      elm.addEventListener('mouseover', function() {
        this.querySelector('.children').classList.add('hovered')
      })
      elm.addEventListener('mouseout', function() {
        this.querySelector('.children').classList.remove('hovered')
      })
    })
  }

  handleClick = (e) =>{
    e.preventDefault()
    let item = e.target.parentElement.getElementsByClassName('children')[0]
    if(document.body.clientWidth < 600){
      if(!item){
        this.props.handleOpenCloseMenu()
        const menuItems = document.getElementsByClassName('children')
        for (let item of menuItems){
          item.style.display = 'none'
          this.setState({ isClose:true })
        }
        return
      }
      if(this.state.isClose){
        if(item) { item.style.display = 'block' }
        this.setState({ isClose:false })
      }else{
        if(item) { item.style.display = 'none' }
        this.setState({ isClose:true })
      }
    }else{
      const item = e.target.parentElement.parentElement
      item.classList.remove('hovered')
    }
  }

  handleLogOut = (e) => {
    e.preventDefault()
    const { removeTokenUser } = this.props.actions
    removeTokenUser();
    window.location.assign('/')
  }


  render() {
    return (
      <nav className='menu-is-close'>
        <ul>

          <li className='submenu' onClick={this.handleClick}>
            <a>
              <i className='fa fa-archive' aria-hidden='true'></i>
              Inventarios
              <i className="caret fa fa-angle-down" aria-hidden="true"></i>
            </a>
              <ul className='children'>
                <li><Link  to='/'>Facturas Cliente</Link></li>
                <li><Link to='/names'>Nombres Cliente</Link></li>
                <li id='last-li'><Link to='/prices'>Consulta Precios</Link></li>
              </ul>
          </li>

          <li onClick={this.handleClick}>
            <Link to='/cash'>
              <i className='fa fa-money' aria-hidden='true'></i>
              Cuadre Caja
            </Link>
          </li>

          <li className='submenu' onClick={this.handleClick}>
            <a>
              <i className='fa fa-cog' aria-hidden='true'></i>
              Utilidades
              <i className="caret fa fa-angle-down" aria-hidden="true"></i>
            </a>
              <ul className='children'>
                <li><Link to='/process'>Procesos rápidos</Link></li>
                <li id='last-li'><Link to='/bank'>Conciliación Bancaria</Link></li>
              </ul>
          </li>

          <li>
            <a onClick={this.handleLogOut}>
              <i className='fa fa-sign-out' aria-hidden='true'></i>
              Salir
            </a>
          </li>

        </ul>
      </nav>
    );
  }

}

function mapStateToProps(state){
  return{
    menuClose: state.menuClose
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions:bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu)
