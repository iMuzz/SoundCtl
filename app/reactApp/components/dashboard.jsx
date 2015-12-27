import React from            'react';
import {Navbar} from         './navbar'
import {StationCreator} from './stationCreator'


export class Dashboard extends React.Component {

	constructor(props){
		super(props);

		this.state = { profile: null}
	}

	componentDidMount(){
		this.props.lock.getProfile(this.props.idToken, (err, profile) => {
			if(err) {
				console.log("Error loading the profile", err);
				// alert("Error loading the profile. Please check the console");
			}
			this.setState({profile: profile});
		});
	}

	render() {
		return  ( 
			<div id="dashboard">
				<Navbar userProfile={this.state.profile}/>
				<StationCreator />
			</div>
		);
	}
}