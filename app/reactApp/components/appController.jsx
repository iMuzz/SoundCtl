import React from                       'react'
import {Navbar} from                    './navbar'
import {Avatar} from                    './avatar'
import {StationManager} from            './stationManager'
import {StationCreator} from            './stationCreator'
import dashStoreInstance from           '../stores/DashStore'
import ProgressBar from                 'react-progress-bar-plus'

let UserActions = require('../actions/UserActions');

export class AppController extends React.Component {

	constructor(props) {
		super(props);

		this.state = { 
			profile: null,
		};

		Object.assign(this.state, dashStoreInstance.getState());
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
			this.setState(dashStoreInstance.getState());
		})
	}

	componentWillUnmount(){
		dashStoreInstance.removeChangeListener();
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
			<div id="dashboard">
				<div className="left-nav">
					<div className="user-bg">
						<div>
							<Avatar imageUrl={"/images/Apple-Beats-1-logo.jpg"} />
						</div>
					</div>
					<nav>
						<div className="tab"> Dashboard </div>
						<div className="tab"> Settings </div>
					</nav>
				</div>

				<div className="dash-view-wrap">
					<ProgressBar percent={this.state.progressState} />
					<Navbar userProfile={this.state.profile}/>
					<div className="dash-view">
						{this.getView()}
					</div>
				</div>
			</div>
		);
	}
}

class SideNav extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return  ( 
			<div className="left-nav">
				<div className="user-bg">
					<div>
						<Avatar imageUrl={"/images/Apple-Beats-1-logo.jpg"} />

					</div>
				</div>
				<nav>
					<div className="tab active"> Dashboard </div>
					<div className="tab"> Settings </div>
				</nav>
			</div>
		);
	}
}