// var React = require('react');
// var ReactDom = require('react-dom');
import React from         'react';
import ReactDom from      'react-dom';
import $ from             'jquery';
import {Navbar} from      './components/navbar';
import {Dashboard} from   './components/dashboard';

let sinewave = require('./modules/sinewave');

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


$(document).ready(function(){
	if (document.getElementById('home')) {
		ReactDom.render(<App />, document.getElementById('home'));
	}
});