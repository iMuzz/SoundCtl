import {FluxStore} from       './fluxStore';
import AppDispatcher from     '../dispatcher/AppDispatcher';
import $ from                 'jquery';
import {EventEmitter} from    'fbemitter';

const CHANGE_EVENT = 'IntroStoreChange';
let emitter = new EventEmitter();

let token;

let privateVars = {
	cacheAvailable: false
};

let dashState = {
	progressState: 100,
	stationLoaded: false,
	station: ""
};

function reset() {
	dashState = {
		progressState: 50,
		stationLoaded: false,
		station: ""
	};
}

class StationStore {
	constructor(){}

	emitChange() {
		console.log('StationStore has changed! Emitting event...', CHANGE_EVENT );
		emitter.emit(CHANGE_EVENT);
	}

	addChangeListener(callback){
		token = emitter.addListener(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback){
		console.log('REMOVE event listener from stationStore ', CHANGE_EVENT);
		token.remove();
	}

	getState(){
		if (!privateVars.cacheAvailable) { // If station not retrieved from API
			$.ajax({
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
				url: '/api/stations',
				method: 'GET',
			}).done((data) => {
				privateVars.cacheAvailable = true;
				Object.assign(dashState, data);
				this.emitChange();
			}).error(err => {
				console.log('GET failed with..', err)
			});
		} else {
			return dashState;
		};
	}

	createStation(callsign){
		$.ajax({
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
			url: '/api/stations',
			method: 'POST',
			data: {'callsign': callsign}
		}).done(() => {
			dashState.station = callsign;
			console.log("Dash state: ", dashState);
			this.emitChange();
		}).error(err => {
		});
	}

	deleteStation(){
		var callsign = dashState.station;

		$.ajax({
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
			url: '/api/stations/' + callsign,
			type: 'DELETE'
		}).done((data) => {
			dashState.station = '';
			this.emitChange()
		}).error(err => {
			console.log('Delete Failed!');
		});
	}
}

let stationStoreInstance = new StationStore();

AppDispatcher.register( action => {
	switch(action.actionType) {
		case "CREATE_STATION":
			stationStoreInstance.createStation(action.payload);
			stationStoreInstance.emitChange();
			break;
		case "DELETE_STATION":
			stationStoreInstance.deleteStation();
		default:
			break;
	}
});

export default stationStoreInstance;