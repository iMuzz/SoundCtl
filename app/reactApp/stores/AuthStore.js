var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

let emitter = new EventEmitter();
const AUTH_EVENT = 'auth-change';

export class AuthStore {

	static emitChange(){
		console.log('emitting event..', AUTH_EVENT );
		emitter.emit(AUTH_EVENT);
	}

	static addChangeListener(callback){
		console.log('Create event listener when ' + AUTH_EVENT + ' fires.');
		emitter.on(AUTH_EVENT, callback);
	}

	static removeChangeListener(callback){
		console.log('Remove event listener: ', AUTH_EVENT);
		emitter.removeListener(AUTH_EVENT, callback);
	}
}

AppDispatcher.register( action => {
	switch(action.actionType) {
		case "LOGOUT_USER":
			localStorage.removeItem('userToken');
			AuthStore.emitChange();
			break;
		default:
			break;
	}
});