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

export class SettingsController extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return  ( 
			<div>
				<div> This is the settings.</div>
			</div>
		);
	}
}

class IntroUser extends React.Component {

	constructor(props) {
		super(props);
	}

	handleCallsignChange(e){
		this.setState({callsign: e.target.value});
	}

	render() {
		return  ( 
			<div className="intro-view">
				<div className="icon-wrap"> 
					<img src="/images/icons/tower.svg"/>
				</div>
				<div className="content-wrap">
					<div className="content">
						<h1>Create Station</h1>
						<h3>Please enter the name of the station that you would like to create.</h3>
						<form id="callsign-form" ref="form" onSubmit={this.handleSubmit}>
							<input type="text" name="callsign" placeholder="Station Name" onChange={this.handleCallsignChange}/>
							<input type="submit" value="Create" className="primary-cta"/>
						</form>
					</div>
				</div>
				<div className="progress-trail"> Progress trail </div>
			</div>
		);
	}
}