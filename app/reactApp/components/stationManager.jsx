import React from           'react';
import $ from               'jquery';
import AppDispatcher from   '../dispatcher/AppDispatcher';


export class StationManager extends React.Component {

	constructor(props){
		super(props);

		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete(){
		AppDispatcher.dispatch({
			actionType: "DELETE_STATION"
		});
	}

	render() {
		let url = 'http://' + this.props.station + '.soundctl.com';
		console.log(url);
		return  ( 
			<div className="station-manager"> 
				<div>
					<a target="_blank" href={url}>http://{this.props.station}.soundctl.com </a> 
				</div>
				<div>
					<button className="button"> Start </button>
					<button className="button"> Stop </button>
				</div>
			</div>
		);
		// <button className="button" onClick={this.handleDelete}> Delete </button>
	}
}