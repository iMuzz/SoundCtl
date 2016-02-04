import {FluxStore} from     './fluxStore';
import AppDispatcher from   '../dispatcher/AppDispatcher';
import $ from               'jquery';
import {EventEmitter} from    'fbemitter';

const CHANGE_EVENT = 'IntroStoreChange';
let emitter = new EventEmitter();

let IntroUserViewState = {
	hasChanged:  false
};

function reset() {
	IntroUserViewState = {
		hasChanged: false
	};
}

let token;

class IntroUserStore {
	constructor(){}

	emitChange() {
		console.log('emitting event..', CHANGE_EVENT );
		emitter.emit(CHANGE_EVENT);
	}

	addChangeListener(callback){
		token = emitter.addListener(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback){
		console.log('REMOVE event listener from IntroStore for BUTTON: ', CHANGE_EVENT);
		token.remove();
	}

	getState(){
		return IntroUserViewState;
	}

	changeSomething(){
		IntroUserViewState.hasChanged = true;
	}
}

let introUserStoreInstance = new IntroUserStore();

AppDispatcher.register( action => {
	switch(action.actionType) {
		case "TEST":
			introUserStoreInstance.changeSomething();
			console.log("IntroUserStore emitting change...");
			introUserStoreInstance.emitChange();
			break;
		default:
			break;
	}
});

export default introUserStoreInstance;