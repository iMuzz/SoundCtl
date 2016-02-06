import {FluxStore} from       './fluxStore';
import AppDispatcher from     '../dispatcher/AppDispatcher';
import {EventEmitter} from    'fbemitter';

var Source = require('../modules/_source/source.js');

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
		var src;
		var audioCtx;
		var AudioContext;
		AudioContext = window.AudioContext || window.webkitAudioContext;
		audioCtx = new AudioContext();
		src = new Source();
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false
			}).then(function(stream) {
			try {
				src.init(audioCtx, "wss://fun.kradradio.com/incoming/source.occ", stream);
			} catch(e) {
				console.log(e);
				return;
			}
			src.start();
			}, function(e) {
			  console.log(e);
			});
		  } else {
			navigator.getUserMedia = (navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia);
			navigator.getUserMedia({
			audio: true,
			video: false
			}, function(stream) {
			try {
				src.init(audioCtx, "wss://fun.kradradio.com/incoming/source.occ", stream);
			} catch(e) {
				console.log(e);
				return;
			}
			src.start();
			}, function(e) {
			console.log(e);
			});
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