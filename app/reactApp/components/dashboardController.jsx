import React from                       'react'
import {Navbar} from                    './navbar'
import {StationManager} from            './stationManager'
import {StationCreator} from            './stationCreator'
import dashStoreInstance from           '../stores/DashStore'
import ProgressBar from                 'react-progress-bar-plus'

let UserActions = require('../actions/UserActions');

export class DashboardController extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
		Object.assign(this.state, dashStoreInstance.getState());
	}

	componentDidMount(){
		console.log('Dashboard Propsuser..', this.props.profile);

		dashStoreInstance.addChangeListener(()=>{
			this.setState(dashStoreInstance.getState());
		});
	}

	componentWillUnmount(){
		dashStoreInstance.removeChangeListener(() => {});
	}

	getView() {
		if (this.state.stationLoaded) {
			if (this.state.station) {
				return(
					<StationManager station={this.state.station}/>
				);
			} else {
				return(
					<StationCreator />
				);
			};
		};
	}

	render() {
		return  ( 
			<div>
				<ProgressBar percent={this.state.progressState} />
				<Navbar userProfile={this.props.profile}/>
				<div className="dash-view">
					{this.getView()}
				</div>
			</div>
		);
	}
}

export class SettingsController extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return  ( 
			<div> This is the settings page</div>
		);
	}
}