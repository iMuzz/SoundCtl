import {FluxStore} from       './fluxStore';
import AppDispatcher from     '../dispatcher/AppDispatcher';
import {EventEmitter} from    'fbemitter';

const CHANGE_EVENT = 'InstanceStoreChange';
let emitter = new EventEmitter();

let token;

let privateVars = {
  cacheAvailable: false
};

let state = {
  id: '',
  clients: '',
  transfer: '',
  apiKey: ''
};

class InstanceStore {
  constructor(){}

  emitChange() {
    console.log('instanceStore has changed! Emitting event...', CHANGE_EVENT );
    emitter.emit(CHANGE_EVENT);
  }

  addChangeListener(callback){
    token = emitter.addListener(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback){
    console.log('REMOVE event listener from instanceStore ', CHANGE_EVENT);
    token.remove();
  }

  getState(){
    if (!privateVars.cacheAvailable) { // If station not retrieved from API
      $.ajax({
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('userToken') },
        url: '/api/instance',
        method: 'GET',
      }).done((data) => {
        privateVars.cacheAvailable = true;
        Object.assign(state, data);
        this.emitChange();
      }).error(err => {
        console.log('GET failed with..', err)
      });
    } else {
      return state;
    };
  }
}

let instanceStore = new InstanceStore();

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

export default instanceStore;