import React from                                'react';
import ReactDom from                             'react-dom';

import { Router, Route, Link, IndexRoute, useRouterHistory } from  'react-router';
import { createHashHistory } from                'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

import $ from                                    'jquery';
import {AppController} from                      './components/appController';
import {DashboardController} from                './components/dashboardController';
import {SettingsController} from                 './components/settingsController';
import {Home} from                               './components/website/home'
import {PricingPage} from                        './components/website/pricing-page'
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
    // debugger;
    if (!idToken && authHash) {
      // debugger;
      if (authHash.id_token) {
        // debugger;
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
        console.log('userToken set..', localStorage.getItem('userToken'));
      }
      if (authHash.error) {
        // debugger;
        console.log("Error signing in", authHash);
      }
    }
    // debugger;
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
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NvdW5kY3RsLmF1dGgwLmNvbS8iLCJzdWIiOiJnaXRodWJ8NzI5NzI2OSIsImF1ZCI6ImRhOG9MMGJaU2xqc2NLcjk0T3ExMVc3UDdBaVR2YjRMIiwiZXhwIjoxNDYwOTk2NDY2LCJpYXQiOjE0NjA5NjA0NjZ9.xG1LH7sA7kCXfYy2G_ToJLh3FtomUwts8po-OPuzSMk

$(document).ready(function(){
	window.addEventListener("hashchange", function(){
    // debugger
		if (window.location.hash.substr(0,15) === "#/access_token=") {
      // debugger;
			localStorage.setItem('auth0Hash', window.location.hash.replace('/', ''));
      // debugger;
			window.location.hash = '/app/dashboard';
		};
	});
	
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
});