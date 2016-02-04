import React from                       'react'
import AppDispatcher from               '../dispatcher/AppDispatcher';

// Import Stores
import stationStoreInstance from        '../stores/stationStore'

export class SettingsController extends React.Component {

	constructor(props) {
		super(props);

		this.state = {}
		Object.assign(this.state, stationStoreInstance.getState());

		this.handleDelete = this.handleDelete.bind(this);
		this.handleStationStoreChange = this.handleStationStoreChange.bind(this);
	}
	componentDidMount(){
		stationStoreInstance.addChangeListener(this.handleStationStoreChange);
	}

	componentWillUnmount(){
		stationStoreInstance.removeChangeListener(this.handleStationStoreChange);
	}

	handleStationStoreChange() {
		this.setState(stationStoreInstance.getState());
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