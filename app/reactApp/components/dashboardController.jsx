import React from                       'react'
import AppDispatcher from               '../dispatcher/AppDispatcher'

// React Components
import {UsageSection} from              './usageSection'
import {UptimeSection} from             './uptimeSection'
import {AppInfoSection} from            './appInfoSection'

// Stores
import instanceStore from               '../stores/instanceStore'

// components
import {DashNav} from                   './dash-nav'

let UserActions = require('../actions/UserActions');

export class DashboardController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Object.assign(this.state, instanceStore.getState());
    this.handleInstanceStoreChange = this.handleInstanceStoreChange.bind(this);
  }

  componentDidMount(){
    instanceStore.addChangeListener(this.handleInstanceStoreChange)
  }

  componentWillUnmount(){
    instanceStore.addChangeListener(()=> { console.log('COMPONENT MOUNTED!')})
  }

  handleInstanceStoreChange(){
    console.log("UPDATING DASHBOARD BECAUSE INSTNACE STORE CHANGED!");
    this.setState(instanceStore.getState());
  }

  render() {
    console.log('Rendering Dashboard controller!', this.state);
    if (this.state.transfer === undefined) {
      return ( <div> Loading...</div> )
    }
    return  (
      <div>
        <div className="dash-view">
          <UsageSection transfer={this.state.transfer} clients={this.state.clients}></UsageSection>
          <UptimeSection startTime={this.state.startedAt}></UptimeSection>
          <AppInfoSection instanceID={this.state.id} apiKey={this.state.apiKey}></AppInfoSection>
        </div>
      </div>
    );
  }
}