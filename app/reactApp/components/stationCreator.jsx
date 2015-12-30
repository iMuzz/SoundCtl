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
			<div className="panel-wrap">
				<div className="panel">
					<form ref="form" onSubmit={this.handleSubmit}>
						<h1> Enter Station Name</h1>
						<div>
							<input name="callsign" placeholder="radio" value={this.state.callsign} onChange={this.handleCallsignChange}/>
							<span>.soundctl.com</span>
						</div>
						<div className="buttonWrap">
							<input className="submit" type="submit" value="Create Station"/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}