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

class IntroUserStore extends FluxStore {
	constructor(){
		super();
	}

	getState(){

	}
}

let introUserStoreInstance = new IntroUserStore();

AppDispatcher.register( action => {
	switch(action.actionType) {
		// case "CREATE_STATION":
		// 	introUserStoreInstance.createStation(action.payload);
		// 	introUserStoreInstance.emitChange();
		// 	break;
		// case "DELETE_STATION":
		// 	introUserStoreInstance.deleteStation(action.payload);
		// default:
		// 	break;
	}
});

export default introUserStoreInstance;