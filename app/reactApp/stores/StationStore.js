var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

let emitter = new EventEmitter();
const STATION_EVENT = 'station-change'

export class StationStore {

	static emitChange(){
		console.log('emitting event..', STATION_EVENT );
		emitter.emit(STATION_EVENT);
	}

	static addChangeListener(callback){
		console.log('Create event listener when ' + STATION_EVENT + ' fires.');
		emitter.on(STATION_EVENT, callback);
	}

	static removeChangeListener(callback){
		console.log('Remove event listener: ', STATION_EVENT);
		emitter.removeListener(STATION_EVENT, callback);
	}
}

AppDispatcher.register( action => {
	switch(action.actionType) {
		case "CREATE_STATION":
			console.log("calling emitChange() from the StationStore....");
			StationStore.emitChange();
			break;
		default:
			break;
	}
});