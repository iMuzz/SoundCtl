import React from                                'react'
import { Router, Route, Link, IndexRoute} from   'react-router'
import {Avatar} from                             './avatar'
import {StationManager} from                     './stationManager'
import {DashNav} from                            './dash-nav'

import activeComponent from                      'react-router-active-component'

let UserActions = require('../actions/UserActions');

export class AppController extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      profile: null
    };
  }

  componentDidMount(){
    this.props.lock.getProfile(this.props.idToken, (err, profile) => {
      if(err) {
        UserActions.logout();
      }
      this.setState({profile: profile});
    });
  }

  render() {
    return  ( 
      <div id="dashboard">
        <SideNav />
        <div className="dash-view-wrap">
          <DashNav userProfile={this.state.profile}/>
          { React.cloneElement(this.props.children, {profile: this.state.profile}) }
        </div>
    </div>
    );
  }
}

class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let NavItem = activeComponent("li");

    return  ( 
      <div className="left-nav">
        <div className="company-logo-wrap">
          <div className="company-logo">
            <img className="wave" src="images/icons/waves.svg" alt=""/>
            <div className="text"> SoundCTL </div>
          </div>
        </div>
        <nav>
          <NavItem className="tab" to="app/dashboard">  Dashboard </NavItem>
          <li className="tab">
            <a target='_blank' href='https://docs.soundctl.io/docs'> Docs </a>
          </li>
          { /** <NavItem className="tab" to="app/settings"> <div className='svg settings' ></div> Settings </NavItem> **/}
        </nav>
      </div>
    );
  }
}
