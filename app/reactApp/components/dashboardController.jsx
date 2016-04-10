import React from                       'react'
import AppDispatcher from               '../dispatcher/AppDispatcher'

// components
import {DashNav} from                   './dash-nav'

let UserActions = require('../actions/UserActions');

export class DashboardController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount(){
	}

	componentWillUnmount(){
	}

	render() {
		return  ( 
			<div>
				<DashNav userProfile={this.props.profile}/>
				<div className="dash-view">
				</div>
			</div>
		);
	}
}