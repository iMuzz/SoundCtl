import {FluxStore} from     './fluxStore';
import AppDispatcher from   '../dispatcher/AppDispatcher';
import $ from               'jquery';

let dashState = {
	progressState: 100,
	stationLoaded: false
};

function reset() {
	dashState = {
		progressState: 50,
		stationLoaded: false
	};
}

class DashStore extends FluxStore {
	constructor(){
		super();
	}

	getState(){
		if (Object.keys(dashState).length === 2) { // If station not retrieved from API
			console.log('station not here so getting the station....')
			this.loading();
			$.ajax({
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
				url: '/api/stations',
				method: 'GET',
			}).done((data) => {
				dashState.stationLoaded = true;
				Object.assign(dashState, data);
				this.finishProgress();
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
		this.loading();
		$.ajax({
			headers: {'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
			url: '/api/stations',
			method: 'POST',
			data: {'callsign': callsign}
		}).done(() => {
			dashState.station = callsign;
			this.emitChange();
			this.finishProgress();
		}).error(err => {
			this.finishProgress();
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

	loading(){
		dashState.progressState = 50;
		this.emitChange();
	}

	finishProgress(){
		dashState.progressState = 100;
		this.emitChange();
	}
}

let DashStoreInstance = new DashStore();

AppDispatcher.register( action => {
	switch(action.actionType) {
		case "CREATE_STATION":
			DashStoreInstance.createStation(action.payload);
			DashStoreInstance.emitChange();
			break;
		case "DELETE_STATION":
			DashStoreInstance.deleteStation(action.payload);
		default:
			break;
	}
});

export default DashStoreInstance;