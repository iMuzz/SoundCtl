import AppDispatcher from   '../dispatcher/AppDispatcher';
import {FluxStore}from      './fluxStore';

let userState;

function reset() {
	userState = {};
}

class UserStore extends FluxStore {
	constructor() {
		super();
	}

	getState() {
		return userState;
	}
}

let userStoreInstance = new UserStore();

AppDispatcher.register( action => {
	switch(action.actionType) {
		case "LOGOUT_USER":
			localStorage.removeItem('userToken');
			userStoreInstance.emitChange();
			break;
		case "LOGIN_USER":
			// localStorage.setItem(action.data);
			break;
		default:
			break;
	}
});

export default userStoreInstance;