import React from                       'react'
import {Navbar} from                    './navbar'
import {StationManager} from            './stationManager'
import {StationCreator} from            './stationCreator'
import dashStoreInstance from           '../stores/DashStore'

let UserActions = require('../actions/UserActions');


export class DashboardController extends React.Component {

	constructor(props) {
		super(props);

		this.state = { 
			profile: null,
		};

		Object.assign(this.state, dashStoreInstance.getState());
		console.log("state currenty.. ", this.state);
	}

	componentDidMount(){
		this.props.lock.getProfile(this.props.idToken, (err, profile) => {
			if(err) {
				console.log("Error loading the profile", err);
				UserActions.logout();
			}
			this.setState({profile: profile});
		});

		dashStoreInstance.addChangeListener(()=>{
			console.log('callback executed after change event fired!');
			
			this.setState(dashStoreInstance.getState());
			this.forceUpdate();
		})
	}

	componentWillUnmount(){
		console.log('removing listener...');
		dashStoreInstance.removeChangeListener();
	}

	getView() {
		if (this.state.station) {
			return(
				<StationManager station={this.state.station}/>
			);
		} else {
			return(
				<StationCreator />
			);
		};
	}

	render() {

		return  ( 
			<div id="dashboard">
				<Navbar userProfile={this.state.profile}/>
				<div className="dash-view">
					{this.getView()}
				</div>
			</div>
		);
	}
}