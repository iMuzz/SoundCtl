import React from                       'react'
import AppDispatcher from               '../dispatcher/AppDispatcher'

// React Components
import {UsageSection} from              './usageSection'
import {UptimeSection} from             './uptimeSection'
import {AppInfoSection} from            './appInfoSection'
import {MaxCapacity} from               './maxCapacity'

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
    this.setState(instanceStore.getState());
  }

  render() {
    let componentToRender;

    if (this.state.message === undefined) {
      return ( <div className='loader'> Loading...</div> )
    }

    if (this.state.message === 'Max Capacity') {
      componentToRender = (
        <MaxCapacity profile={this.props.profile}/>
      )
    } else {
      componentToRender = (
        <div>
          <UsageSection transfer={this.state.transfer} clients={this.state.clients}></UsageSection>
          <UptimeSection startTime={this.state.startedAt}></UptimeSection>
          <AppInfoSection instanceID={this.state.id} apiKey={this.state.apiKey}></AppInfoSection>
        </div>
      )
    }
    return  (
      <div className="dash-view animated fadeIn">
        { componentToRender }
      </div>
    );
  }
}