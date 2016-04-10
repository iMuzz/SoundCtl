// Base Imports
import React from                         'react'

// Import Components
import {ConnectMicrophone} from           './connectMicrophone'
import {StationCreator} from              './stationCreator'

// Import Stores


export class IntroUser extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let component;

		if (this.props.station !== "") { //if the user doesn't have a station or has deleted a station
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
