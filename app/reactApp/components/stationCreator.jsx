import React from           'react';
import $ from               'jquery';
import AppDispatcher from   '../dispatcher/AppDispatcher';


export class StationCreator extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			callsign: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCallsignChange = this.handleCallsignChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		let callsign = this.state.callsign.trim();

		AppDispatcher.dispatch({
			actionType: 'CREATE_STATION',
			payload: callsign
		});
	}

	handleCallsignChange(e){
		this.setState({callsign: e.target.value});
	}

	render() {
		return  ( 
			<div className="intro-cta-wrap station-creator">
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
			</div>
		);
	}
}