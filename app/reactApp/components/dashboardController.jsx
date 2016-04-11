import React from                       'react'
import AppDispatcher from               '../dispatcher/AppDispatcher'
import {UsageSection} from              './usageSection'
import {UptimeSection} from             './uptimeSection'
import {AppInfoSection} from             './appInfoSection'

// components
import {DashNav} from                   './dash-nav'

let UserActions = require('../actions/UserActions');

export class DashboardController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return  ( 
      <div>
        <div className="dash-view">
          <UsageSection></UsageSection>
          <UptimeSection></UptimeSection>
          <AppInfoSection></AppInfoSection>
        </div>
      </div>
    );
  }
}