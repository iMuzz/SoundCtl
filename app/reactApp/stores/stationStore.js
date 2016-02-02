import {FluxStore} from     './fluxStore';
import AppDispatcher from   '../dispatcher/AppDispatcher';
import $ from               'jquery';

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

class StationStore extends FluxStore {
	constructor(){
		super();
	}

	getState(){
		if (!privateVars.cacheAvailable) { // If station not retrieved from API
			console.log('station not here so getting the station....')
			$.ajax({
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
				url: '/api/stations',
				method: 'GET',
			}).done((data) => {
				privateVars.cacheAvailable = true;
				Object.assign(dashState, data);
				console.log("Dash State", dashState)
				this.emitChange();
			}).error(err => {
				console.log('GET failed with..', err)
			});
		} else {
			console.log('Returning cached station....')
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

	deleteStation(callsign){
		this.loading();
		$.ajax({
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
			url: '/api/stations/' + callsign,
			type: 'DELETE'
		}).done((data) => {
			dashState.station = '';
			this.emitChange()
			this.finishProgress();
		}).error(err => {
			console.log('Delete Failed!');
			this.finishProgress();
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
			stationStoreInstance.deleteStation(action.payload);
		default:
			break;
	}
});

export default stationStoreInstance;