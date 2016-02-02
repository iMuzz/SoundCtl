import React from                       'react'
import {Navbar} from                    './navbar'
import {StationManager} from            './stationManager'
import {StationCreator} from            './stationCreator'
import stationStoreInstance from        '../stores/stationStore'
import ProgressBar from                 'react-progress-bar-plus'
import AppDispatcher from               '../dispatcher/AppDispatcher';

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

	}

	componentDidMount(){
		stationStoreInstance.addChangeListener(()=>{
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

		this.state = {}
		Object.assign(this.state, stationStoreInstance.getState());

		this.handleDelete = this.handleDelete.bind(this);
	}
	componentDidMount(){
		stationStoreInstance.addChangeListener(()=>{
			console.log("SettingsController getting state of stationStore...");
			this.setState(stationStoreInstance.getState());
		});
	}

	componentWillUnmount(){
		console.log("SettingsController should be unmounting.....");
		stationStoreInstance.removeChangeListener(() => {
			console.log("SettingsController should be unmounting.....");
		});
	}

	handleDelete(){
		AppDispatcher.dispatch({
			actionType: 'DELETE_STATION'
		});
	}

	render() {
		var component;
		if (this.state.station !== "") {
			component = <button className="primary-cta btn-danger" onClick={this.handleDelete}> Delete </button>;
		} else{
			component = <div> This will be the settings page </div>
		};
		return  ( 
			<div className="settings-view">
				<div className="content">
					{component}
				</div>
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
			<div className="intro-cta-wrap connect-mic">
				<div className="icon-wrap"> 
					<img src="/images/icons/mic.svg"/>
				</div>
				<div className="content-wrap">
					<div className="content">
						<h1>Connect Mic</h1>
						<h3>In order for your listeners to be able to hear what you have to say, we need to connect your mic. Click the button below to set up your Microphone.</h3>
						<form id="callsign-form" ref="form" onSubmit={this.handleSubmit}>
							<input type="submit" value="Connect" className="primary-cta"/>
						</form>
					</div>
				</div>
			</div>
		);
	}
}