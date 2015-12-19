import $ from 'jquery';

export class soundCtlStation {
	
	 constructor(callsign){

		this.mixerStore = null;

		var proto = window.location.protocol === "https:" ? "wss" : "ws";
		const hostname = "kradradio.com";
		const port = "4545";
		const subProto = "krad-ws-api";
		const url = proto + "://" + callsign + "." + hostname + ":" + port;
		this.socket = new WebSocket(url, subProto);
		
		this.socket.onopen = this._socketOnOpen.bind(this);
		this.socket.onclose = this._webSocketOnClose.bind(this);
		this.socket.onmessage = this._socketOnMessage.bind(this);
		this.socket.onerror = this._webSocketOnError.bind(this);

		this.patches = 0;
		this.warehouse = [];
	} 

	_socketOnOpen(event) {
		console.log("Websocket connection established with:", this.socket.url);
		this.sendCommand('GET', '/mixer');
	}

	_webSocketOnClose(event) {
		console.log("Websocket closed with code " + event.code + ": " + event.reason);
	}

	_webSocketOnError() {
		console.log('Websocket Error');
	}

	_socketOnMessage(event) {
		var crate = JSON.parse(event.data);
		// console.log(crate.meth + " " + crate.path);

		if (crate.data) {
			// console.log(crate.data);
		};
		if (crate.path.split('/').length < 3) { //if its a root node
			crate.data.path.forEach( path => {
				this.sendCommand('GET', path.name)
			});
			return;
		};

		switch (crate.meth) {
			case "PUT":
				var storeCrate = {
					path: crate.path,
					data: crate.data
				};
				this.warehouse.push(storeCrate);
				break;
			case "PATCH":
				this.patches = this.patches + 1;
				break;
			case "DELETE":
				this.warehouse = this.warehouse.filter(currCrate => {
					return crate.path !== currCrate.path;
				});
				break;
			};
		console.log("Warehouse contains " + this.warehouse.length + " crates: ", this.warehouse);
		// console.log("Number of patches " + this.patches);
	}

	sendCommand(meth, path, data = {}) {
		let c = Crate(meth, path, data);
		var payload = JSON.stringify(c);
		console.log("Payload: ", payload);
		this.socket.send(payload);
	}
}



function Crate(meth, path, data = null) {
	var crate = {
		meth: meth,
		path: path,
		meta: {},
		data: data
	}
	return crate;
}


class MixerStore {
	constructor(paths) {
		this.mixersCollection = paths.map(path => {
			return new Mixer(path);
		});
	}
}

class Mixer {
	constructor(path, data = {}) {
		this.path = path;
		this.data = data;
	}
}






