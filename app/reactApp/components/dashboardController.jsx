import React from                       'react'
import AppDispatcher from               '../dispatcher/AppDispatcher'
import {UsageSection} from              './usageSection'

// components
import {DashNav} from                   './dash-nav'

let UserActions = require('../actions/UserActions');

export class DashboardController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  render() {
    return  ( 
      <div>
        <div className="dash-view">
          <UsageSection></UsageSection>
        </div>
      </div>
    );
  }
}