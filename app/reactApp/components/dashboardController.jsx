import React from                       'react'
import {Navbar} from                    './navbar'
import {StationManager} from            './stationManager'
import {StationCreator} from            './stationCreator'
import stationStoreInstance from           '../stores/stationStore'
import ProgressBar from                 'react-progress-bar-plus'

let UserActions = require('../actions/UserActions');

export class DashboardController extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
		Object.assign(this.state, stationStoreInstance.getState());
	}

	componentDidMount(){
		stationStoreInstance.addChangeListener(()=>{
			this.setState(stationStoreInstance.getState());
		});
	}

	componentWillUnmount(){
		stationStoreInstance.removeChangeListener(() => {});
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
					// {this.getView()}
				// <ProgressBar percent={this.state.progressState} />
			<div>
				<Navbar userProfile={this.props.profile}/>
				<div className="dash-view">
					<IntroUser />
				</div>
			</div>
		);
	}
}

class IntroUser extends React.Component {

	constructor(props) {
		super(props);

		this.state = {}
		Object.assign(this.state, stationStoreInstance.getState());
		console.log("IntroUser State in constructor: ", this.state);

	}

	componentDidMount(){
		stationStoreInstance.addChangeListener(()=>{
			console.log("IntroUser State when stationStore updates...: ", this.state);
			console.log("componentDidMount: ", stationStoreInstance.getState());
			this.setState(stationStoreInstance.getState());
		});
	}

	componentWillUnmount(){
		stationStoreInstance.removeChangeListener(() => {});
	}

	render() {
		var component;

		if (this.state.station !== "") { //if the user doesn't have a station or has deleted a station
			component = <ConnectMicrophone />;
		} else{
			component = <StationCreator />;
		};
		return  ( 
			<div className="intro-view">
				{ component }
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
			<div className="settings-view">
				<div> This will be the settings page.</div>
			</div>
		);
	}
}

class ConnectMicrophone extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return  ( 
			<div className="connect-mic">
				<div className="icon-wrap"> 
					<img src="/images/icons/mic.svg"/>
				</div>
			</div>
		);
	}
}