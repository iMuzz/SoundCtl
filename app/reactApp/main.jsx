import React from                                'react';
import ReactDom from                             'react-dom';

import { Router, Route, Link, IndexRoute, useRouterHistory } from  'react-router';
import { createHashHistory } from                'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

import $ from                                    'jquery';
import {AppController} from                      './components/appController';
import {DashboardController} from                './components/dashboardController';
import {SettingsController} from                 './components/settingsController';
import {Home, PricingPage} from                  './components/home'
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
				console.log('userToken set..', localStorage.getItem('userToken'));
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

	window.addEventListener("hashchange", function(){
		if (window.location.hash.substr(0,15) === "#/access_token=") {
			localStorage.setItem('auth0Hash', window.location.hash.replace('/', ''));
			window.location.hash = '/app/dashboard';
		};
	});

	if (document.getElementById('home')) {
			ReactDom.render((
			<Router history={appHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="/pricing" component={PricingPage} />
					<Route path="/app" component={AppController}>
						<IndexRoute component={DashboardController} user={"faraaz"}/>
						<Route path="dashboard" {...this.props} component={DashboardController} />
						<Route path="settings" component={SettingsController} />
					</Route>
				</Route>
			</Router>
		), document.getElementById('home'));

	};
});

// function render() {
// 		let hardcodedObject = [
// 			{
// 				data: {
// 					afx: [
// 						{
// 							volume: {
// 								fader: 10
// 							}
// 						}
// 					]
// 				},
// 				path: "/mixer/Deck1"
// 			},
// 			{
// 				data: {
// 					afx: [
// 						{
// 							volume: {
// 								fader: 20
// 							}
// 						}
// 					]
// 				},
// 				path: "/mixer/Deck2"
// 			}
// 		]
// 		ReactDom.render(<Mixer soundPaths={hardcodedObject} />, document.getElementById('mixers'));
// 	// if (station.dataStore.soundPaths[0]) {
// 	// 	ReactDom.render(<Mixer soundPaths={station.dataStore.soundPaths} />, document.getElementById('mixers'));
// 	// };
// }
