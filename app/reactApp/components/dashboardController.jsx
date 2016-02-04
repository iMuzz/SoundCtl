import React from                       'react'
import {Navbar} from                    './navbar'
import {StationManager} from            './stationManager'
import {IntroUser} from                 './introductionFlow/introUser'
import stationStoreInstance from        '../stores/stationStore'
import introUserStoreInstance from      '../stores/IntroUserStore'
import ProgressBar from                 'react-progress-bar-plus'
import AppDispatcher from               '../dispatcher/AppDispatcher'

let UserActions = require('../actions/UserActions');

export class DashboardController extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
		Object.assign(this.state, stationStoreInstance.getState());

		this.handleStationStoreChange = this.handleStationStoreChange.bind(this);
	}

	componentDidMount(){
		stationStoreInstance.addChangeListener(this.handleStationStoreChange);
	}

	componentWillUnmount(){
		stationStoreInstance.removeChangeListener(this.handleStationStoreChange);
	}

	handleStationStoreChange(){
		this.setState(stationStoreInstance.getState());
	}

	render() {
		return  ( 
			<div>
				<Navbar userProfile={this.props.profile}/>
				<div className="dash-view">
					<IntroUser station={this.state.station}/>
				</div>
			</div>
		);
	}
}