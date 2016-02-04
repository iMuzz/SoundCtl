// Base imports
import React from                       'react'

export class ConnectMicrophone extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return  ( 
			<div className="intro-cta-wrap connect-mic">
				<div className="icon-wrap"> 
					<img src="/images/icons/mic.svg"/>
				</div>
				<div className="content-wrap">
					<div className="content">
						<h1>Connect Mic</h1>
						<h3>In order for your listeners to be able to hear what you have to say, we need to connect your mic. Click the button below to set up your Microphone.</h3>
						<form id="callsign-form" ref="form" onSubmit={this.handleSubmit}>
							<input type="submit" value="Connect" className="primary-cta"/>
						</form>
					</div>
				</div>
			</div>
		);
	}
}