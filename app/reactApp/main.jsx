// var React = require('react');
// var ReactDom = require('react-dom');
import React from         'react';
import ReactDom from      'react-dom';
import $ from             'jquery';
import {Navbar} from      './components/navbar';

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
		this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
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
		if (this.state.idToken) {
			return ( <div> logged in </div>);
		} else {
			return ( <div> logged out</div> );
		}
	}
}

class Intro extends React.Component {
	render() {
		return  ( 
			<div> 
				<Navbar />
			</div> 
		);
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

	render() {
		return (
			<div>
				<nav className="nav">
					<div className="nav-item"> SoundCtl </div>
					<div className="nav-right"> 
						<div className="nav-item">
							<a href='/dashboard'> Dashboard </a>
						</div>
						<div className="nav-item"> Login </div>
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
					<div id="container" className="container"></div>
				</div>
			</div>
		)
	}
}

$(document).ready(function(){
	ReactDom.render(<Home />, document.getElementById('body'));
});