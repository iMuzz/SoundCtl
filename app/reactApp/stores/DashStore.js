import {FluxStore} from     './fluxStore';
import AppDispatcher from   '../dispatcher/AppDispatcher';
import $ from               'jquery';

let dashState = {};

function reset() {
	dashState = {};
}

class DashStore extends FluxStore {
	constructor(){
		super();
	}

	getState(){
		if (!Object.keys(dashState).length) { //if user object is empty
			$.ajax({
				headers: {'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
				url: '/api/stations',
				method: 'GET',
			}).done((data) => {
				dashState = data;
				console.log(dashState);
				this.emitChange();
			}).error(err => {
				console.log('GET failed with..', err)
			});
		} else {
			return dashState;
		};
	}

	deleteStation(){
		reset();

		// Call API?
	}
}

let DashStoreInstance = new DashStore();

AppDispatcher.register( action => {
	switch(action.actionType) {
		case "CREATE_STATION":
			console.log("calling emitChange() from the DashStore....");
			DashStoreInstance.emitChange();
			break;
		case "DELETE_STATION":
			DashStoreInstance.deleteStation();
			DashStoreInstance.emitChange();
		default:
			break;
	}
});

export default DashStoreInstance;