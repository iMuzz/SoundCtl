// Base imports
import React from                          'react'
import AppDispatcher from                  '../../dispatcher/AppDispatcher'
import microphoneStoreInstance from        '../../stores/microphoneStore'


export class ConnectMicrophone extends React.Component {

	constructor(props) {
		super(props);

		this.connectMic = this.connectMic.bind(this);
	}

	connectMic(){
		console.log("Connect MIC in Component called");
		AppDispatcher.dispatch({
			actionType: 'ASK_PERMISSION'
		});
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
						<button className="primary-cta btn-danger" onClick={this.connectMic}> Connect </button>
					</div>
				</div>
			</div>
		);
	}
}