import React from         'react';
import ReactDom from      'react-dom';
import $ from             'jquery';
import {Navbar} from      './components/navbar';
import {Dashboard} from   './components/dashboard';

let sinewave = require('./modules/sinewave');

var EventEmitter = require('fbemitter').EventEmitter;

import {socketManager} from './modules/websocket';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.setupAjax = this.setupAjax.bind(this);
		this.createLock = this.createLock.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.getIdToken = this.getIdToken.bind(this);
	}
	componentWillMount() {
		this.setupAjax();
		this.createLock();
		
		this.setState({ idToken: this.getIdToken()});
	}
	setupAjax() {
		$.ajaxSetup({
			'beforeSend': function(xhr) {
				if (localStorage.getItem('userToken')) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
				}
			}
		});
	}
	createLock() {
		this.lock = new Auth0Lock("da8oL0bZSljscKr94Oq11W7P7AiTvb4L", "soundctl.auth0.com");
	}
	getIdToken() {
		var idToken = localStorage.getItem('userToken');
		var authHash = this.lock.parseHash(window.location.hash);
		if (!idToken && authHash) {
			if (authHash.id_token) {
				idToken = authHash.id_token
				localStorage.setItem('userToken', authHash.id_token);
			}
			if (authHash.error) {
				console.log("Error signing in", authHash);
			}
		}
		return idToken;
	}
	render() {
		// this.state.idToken = null;
		if (this.state.idToken) {
			// If user is logged in 
			return (<Dashboard lock={this.lock} idToken={this.state.idToken}/>);
		} else {
			// If user is not logged in
			return ( <div> <Home lock={this.lock}/> </div> );
		}
	}
}

class Home extends React.Component {
	constructor(props){
		super(props);

		this.showLock = this.showLock.bind(this);
	}
	showLock() {
		this.props.lock.show();
	}

	componentDidMount(){
		new sinewave({
			width: 1000,
			height: 300,
			speed: 0.009,
			container: document.getElementById('sinewave'),
			autostart: true,
		});
	}

	render() {
		return (
			<div>
				<nav className="nav">
					<div className="nav-item"> SoundCtl </div>
					<div className="nav-right"> 
						<div className="nav-item" onClick={this.showLock}> Login </div>
					</div>
				</nav>
				<div className="hero-wrapper"> 
					<div className="bg-hero bg-hero-1"></div>
					<div className="hero-content">
						<div className="company"> SoundCtl </div>
						<div className="hero-title"> This simplest way to broadcast your ideas <span className="bright"> live </span> </div>
						<form id="mc-embedded-subscribe-form" action="//SoundCtl.us12.list-manage.com/subscribe/post?u=be4c8e8b746c8bbb27b92210e&amp;id=7228dc16ba" name="mc-embedded-subscribe-form" method="post" target="_blank">
							<input placeholder="Enter email address" type="email" name="EMAIL" required/>
							<input className="cta-base" type="submit" value="Signup"/>
						</form>
					</div>
					<div id="sinewave" className="container"></div>
				</div>
			</div>
		)
	}
}

class SoundPath extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.data;
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(newval) {
		this.setState({ afx: [{volume: { fader: newval}}]});
		let data = [
			{
				"op": "replace",
				"path": "/afx/0/volume/fader",
				"value": parseInt(newval)
			},
			{
				"op": "replace",
				"path": "/afx/1/volume/fader",
				"value": parseInt(newval)
			}
		];
		station.sendCommand('PATCH',this.props.path, data);
	}

	render() {
		var valueLink = {
			value: this.state.afx[0].volume.fader,
            requestChange: this.handleChange
        };
		return(
			<div className="path-wrap">
				<h4>key {this.key} :: path {this.props.path}</h4>
				<input type="number" valueLink={valueLink} min="-50" max="0" step="1"/>
				<div> ----- value: {this.state.afx[0].volume.fader}</div>
			</div>
		);
	}
}


var station = new socketManager('radio45', render);
var emitter = new EventEmitter();
emitter.addListener('event', function(x, y) { console.log(x, y); });
emitter.emit('event', 5, 10);

// accepts mixer path as a prop
class FaderControl extends React.Component {
	constructor(props){
		super(props);

		this.increase = this.increase.bind(this);
	}

	increase(){
		let newval = this.props.fader + 1;
		let data = [
			{
				"op": "replace",
				"path": "/afx/0/volume/fader",
				"value": newval
			},
			{
				"op": "replace",
				"path": "/afx/1/volume/fader",
				"value": newval
			}
		];

		emitter.emit('PATCH_FADER');
		station.sendCommand('PATCH',this.props.path, data);
	}

	componentDidMount(){
		console.log('station object..', station);
		console.log('emitter object..', emitter);
		emitter.addListener('PATCH_FADER', function(){
			console.log('Patching fader...');
		});
	}

	render(){
		return(
			<div className="path-wrap">
				<h4> Sound Path :: {this.props.path} :: VALUE  ::  {this.props.fader}</h4>
				<button onClick={this.increase}> +1 </button>
				<button onClick={this.fireEvent}> FIRE </button>
				<input type="number" min="-50" max="0" step="1"/>
			</div>
		);
	}
}

FaderControl.defaultProps = { path: "loading mixer path.." };
$(document).ready(function(){
	if (document.getElementById('home')) {
		ReactDom.render(<App />, document.getElementById('home'));
	}
	// ReactDom.render(<FaderControl path={station.warehouse[0].path} fader={station.warehouse[0].data.afx[0].volume.fader}/>, document.getElementById('mixers'));
});

function render() {
	ReactDom.render(<FaderControl path={station.warehouse[0].path} fader={station.warehouse[0].data.afx[0].volume.fader}/>, document.getElementById('mixers'));
}