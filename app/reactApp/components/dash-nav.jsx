import React from                 'react'
import ReactDom from              'react-dom'
import classNames from            'classnames'
import { Link } from              'react-router'
import { Avatar } from            './avatar'
import listensToClickOutside from 'react-onclickoutside/decorator';

let UserActions = require('../actions/UserActions');

export class DashNav extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <nav className='dash-nav'>
        <div className='nav-item'>
          <ClickOutsideUserPanel {...this.props}/>
        </div>
      </nav>
    );
  }
}

class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false }

    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  handleClickOutside(event) {
      this.closeDropdown();
  }
  openDropdown() {
    this.setState({ isOpen: true });
  }

  closeDropdown() {
    this.setState({ isOpen: false});
  }

  onClick(e) {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    if (this.props.userProfile) {
      return (
        <div className='user-panel' onClick={this.onClick}>
          <Avatar imageUrl={this.props.userProfile.picture}/>
          <Dropdown isOpen={this.state.isOpen} itemClickHandler={this.closeDropdown}/>
        </div>
      );
    }     
    return ( <div></div>);
  }
}

// Teach UserPanel how to do something if the user clicks outside it.
const ClickOutsideUserPanel = listensToClickOutside(UserPanel);

UserPanel.defaultProps = { initialCount: 0}

class Dropdown extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.stopPropagation();
    UserActions.logout();
  }
  render() {
    let dropdownClass = classNames('dropdown-wrap', {'is-open': this.props.isOpen});
    return (
      <div className={dropdownClass}>
        <div className='dropdown animated fadeInDown'>
          <div className='menu-bar'> <i className='fa fa-close' onClick={this.props.itemClickHandler} ></i></div>
          <a onClick={this.logout}> 
            <div className='dropdown-item'>   
              Logout
            </div>
          </a>
        </div>
      </div>
    );
  }
}

Dropdown.defaultProps = { isOpen: false };