import React from                                'react';
import ReactDom from                             'react-dom';
import { Router, Route, Link, IndexRoute } from  'react-router';
import $ from                                    'jquery';
import {Navbar} from                             './components/navbar';
import {Dashboard} from             './components/dashboard';
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
			console.log('Callback fired after auth-change event');
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

	renderChildren(){
		return React.Children.map(this.props.children, child =>{
			return React.cloneElement(child, { lock : this.lock})
		});
	}

	render() {
		if (this.state.idToken) { // If user is logged in 
			return (<Dashboard lock={this.lock} idToken={this.state.idToken}/>);
		} else { // If user is not logged in
			return ( <div> <Home lock={this.lock}/> </div> );
		}
		// return(
		// 	<div>
		// 		{this.renderChildren()}
		// 	</div>
		// )
	}
}

$(document).ready(function(){
	if (document.getElementById('home')) {
		ReactDom.render(<App />, document.getElementById('home'));

		// render((
		// 	<Router>
		// 		<Route path="/" component={App}>
		// 			<IndexRoute component={Home} />
		// 			<Route path="/dashboard" component={Dashboard} />
		// 		</Route>
		// 	</Router>
		// ), document.getElementById('home'));
	};

	if (document.getElementById('mixers')) {
		console.log("Calling render() on page load...");
		rend();
	};
});
// var station = new socketManager('radio45', render);

function rend() {
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