import React from                                'react'
import { Router, Route, Link, IndexRoute} from  'react-router';
import {Navbar} from                             './navbar'
import {Avatar} from                             './avatar'
import {StationManager} from                     './stationManager'
import {StationCreator} from                     './stationCreator'
import dashStoreInstance from                    '../stores/DashStore'
import ProgressBar from                          'react-progress-bar-plus'

let UserActions = require('../actions/UserActions');

export class AppController extends React.Component {

	constructor(props) {
		super(props);

		this.state = { 
			profile: null
		};
	}

	componentDidMount(){
		this.props.lock.getProfile(this.props.idToken, (err, profile) => {
			if(err) {
				UserActions.logout();
			}
			this.setState({profile: profile});
		});
	}

	render() {
		return  ( 
			<div id="dashboard">
				<SideNav />
				<div className="dash-view-wrap">
					{ React.cloneElement(this.props.children, {profile: this.state.profile}) }
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
					<Link className="tab active" to="app/dashboard"> Dashboard </Link> 
					<Link className="tab" to="app/settings"> Settings </Link>
				</nav>
			</div>
		);
	}
}