import AppDispatcher from   '../dispatcher/AppDispatcher';
import {FluxStore}from      './fluxStore';
import $ from               'jquery'

let userState = {};

function reset() {
	userState = {};
}

class UserStore extends FluxStore {
	constructor() {
		super();
	}

	getState() {
		
	}
}

let userStoreInstance = new UserStore();

AppDispatcher.register( action => {
	switch(action.actionType) {
		case "LOGOUT_USER":
			localStorage.removeItem('userToken');
			window.location = 'http://localhost:3045/';
			break;
		case "LOGIN_USER":
			// localStorage.setItem(action.data);
			break;
		default:
			break;
	}
});

export default userStoreInstance;