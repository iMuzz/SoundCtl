var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

let emitter = new EventEmitter();
const EVENT_NAME = 'change'

export class SoundPathStore {
	getAll(){
		console.log()
	}

	static emitChange(){
		console.log('emitting event..', EVENT_NAME );
		emitter.emit(EVENT_NAME);
	}

	static addChangeListener(callback){
		console.log('Create event listener when ' + EVENT_NAME + ' fires.');
		emitter.on(EVENT_NAME, callback);
	}

	static removeChangeListener(callback){
		console.log('Remove event listener: ', EVENT_NAME);
		emitter.removeListener(EVENT_NAME, callback);
	}
}

AppDispatcher.register( action => {
	switch(action.actionType) {
		case "SOUND_PATH_CREATE":
			console.log("calling emitChange() from the SoundPathStore....");
			SoundPathStore.emitChange();
			break;
		default:
			break;
	}
});