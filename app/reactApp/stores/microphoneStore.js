import {FluxStore} from       './fluxStore';
import AppDispatcher from     '../dispatcher/AppDispatcher';
import {EventEmitter} from    'fbemitter';

const CHANGE_EVENT = 'MicStore';
let emitter = new EventEmitter();

let MicrophoneStoreState = {
	connected:  false
};

function reset() {
	MicrophoneStoreState = {
		connected: false
	};
}

let token;

class MicrophoneStore {
	constructor(){}

	emitChange() {
		console.log('MicStore Changed. Now emitting event...', CHANGE_EVENT );
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
		return MicrophoneStoreState;
	}

	connectMicrophone(){
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			// Using new API
			console.log("Using new API");
			var p = navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false
			});
			p.then(function(stream) {
			  /*console.log("Mediastream: "+ stream);
			  var tracks = stream.getTracks();
			  tracks.forEach(function(track) {
			    console.log(track);
			    console.log(track.kind + " track: " + track.label + " id = " + track.id);
			  });*/
			  list_devices();
			});
			p.catch(function(err) {
			  console.log("Error Connecting to UserMedia: ", err.name);
			});
		} else {
			// Using older API
			console.log("USing old API");
			navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
			var success = function(stream) {
				console.log("Mediastream: " + stream);
				var tracks = stream.getTracks();
				tracks.forEach(function(track) {
					console.log(track.kind + " track: " + track.label + " id = " + track.id);
				});
				list_devices();
			}
		  var error = function(err) {
		    console.log(err)
		  }
		  navigator.getUserMedia({
		    video: true,
		    audio: true
		  }, success, error);
		}
	}
}

function list_devices() {
  navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        console.log(device.kind + ": " + device.label +
          " id: " + device.deviceId +
          " groupid: " + device.groupId);
      });
      //cap_device("TTXEbiGC38MPa8DccEho5kNCkK/ThEv+j6ajjRFiISM=");
      cap_device(devices[0].deviceId);
    })
    .catch(function(err) {
      //console.log(err.name + ": " + err.message);
    });
}

let microphoneStoreInstance = new MicrophoneStore();

AppDispatcher.register( action => {
	switch(action.actionType) {
		case "ASK_PERMISSION":
			console.log("ASK_PERMISSION");
			microphoneStoreInstance.connectMicrophone();
			microphoneStoreInstance.emitChange();
			break;
		default:
			break;
	}
});

export default microphoneStoreInstance;