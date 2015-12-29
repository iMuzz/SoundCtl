import React from                                'react';
import ReactDom from                             'react-dom';
import { Router, Route, Link, IndexRoute } from  'react-router';
import $ from                                    'jquery';
import {DashboardController} from                './components/dashboardController';
import {Home} from                               './components/home'
import {Mixer} from                              './components/mixer';
import {socketManager} from                      './modules/websocket';
import userStoreInstance from                    './stores/UserStore';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.setupAjax = this.setupAjax.bind(this);
		this.createLock = this.createLock.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.getIdToken = this.getIdToken.bind(this);
		this.renderChildren = this.renderChildren.bind(this);
	}
	componentWillMount() {
		this.setupAjax();
		this.createLock();

		this.setState({ idToken: this.getIdToken()});
	}

	componentDidMount() {
		userStoreInstance.addChangeListener(()=>{
			this.setState({ idToken: null});
		});
	}

	componentWillUnmount(){
		userStoreInstance.removeChangeListener();
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
		var authHash = this.lock.parseHash(localStorage.getItem('auth0Hash'));
		localStorage.removeItem('auth0Hash') //remove the hash or the user will login with oldToken

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

	renderChildren(){
		return React.Children.map(this.props.children, child =>{
			return React.cloneElement(child, { lock : this.lock, idToken: this.state.idToken});
		});
	}

	render() {
		return(
			<div>
				{this.renderChildren()}
			</div>
		)
	}
}

$(document).ready(function(){
	// 
	window.addEventListener("hashchange", function(){
		if (window.location.hash.substr(0,15) === "#/access_token=") {
			console.log("User just got back from Auth0!");
			localStorage.setItem('auth0Hash', window.location.hash.replace('/', ''));
			window.location.hash = '/dashboard';
		};
	});

	if (document.getElementById('home')) {
		ReactDom.render((
			<Router>
				<Route path="/" component={App}>
					<IndexRoute component={Home} />
					<Route path="/dashboard" component={DashboardController} />
				</Route>
			</Router>
		), document.getElementById('home'));
	};

	if (document.getElementById('mixers')) {
		console.log("Calling render() on page load...");
		render();
	};
});
// var station = new socketManager('radio45', render);

function render() {
		let hardcodedObject = [
			{
				data: {
					afx: [
						{
							volume: {
								fader: 10
							}
						}
					]
				},
				path: "/mixer/Deck1"
			},
			{
				data: {
					afx: [
						{
							volume: {
								fader: 20
							}
						}
					]
				},
				path: "/mixer/Deck2"
			}
		]
		ReactDom.render(<Mixer soundPaths={hardcodedObject} />, document.getElementById('mixers'));
	// if (station.dataStore.soundPaths[0]) {
	// 	ReactDom.render(<Mixer soundPaths={station.dataStore.soundPaths} />, document.getElementById('mixers'));
	// };
}