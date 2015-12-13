import React from         'react';

export class StationCreator extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return  ( 
			<div className="panel-wrap">
				<div className="panel">
					<form>
						<h1> Enter Station Name</h1>
						<div>
							<input name="callsign" placeholder="radio" />
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