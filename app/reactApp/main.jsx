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

$(document).ready(function(){
	ReactDom.render(<Intro />, document.getElementById('body'));
});