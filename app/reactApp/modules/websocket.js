import $ from 'jquery';
var EventEmitter = require('fbemitter').EventEmitter;

var __extends=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},OriginalError=Error,jsonpatch;!function(a){function b(a,c){switch(typeof a){case"undefined":case"boolean":case"string":case"number":return a===c;case"object":if(null===a)return null===c;if(y(a)){if(!y(c)||a.length!==c.length)return!1;for(var d=0,e=a.length;e>d;d++)if(!b(a[d],c[d]))return!1;return!0}var f=r(c),g=f.length;if(r(a).length!==g)return!1;for(var d=0;g>d;d++)if(!b(a[d],c[d]))return!1;return!0;default:return!1}}function c(a){return-1===a.indexOf("/")&&-1===a.indexOf("~")?a:a.replace(/~/g,"~0").replace(/\//g,"~1")}function d(a){for(var b=0,c=v.length;c>b;b++)if(v[b].obj===a)return v[b]}function e(a,b){for(var c=0,d=a.observers.length;d>c;c++)if(a.observers[c].callback===b)return a.observers[c].observer}function f(a,b){for(var c=0,d=a.observers.length;d>c;c++)if(a.observers[c].observer===b)return void a.observers.splice(c,1)}function g(a,b){j(b),clearTimeout(b.next);var c=d(a);f(c,b)}function h(a){return"object"==typeof a?JSON.parse(JSON.stringify(a)):a}function i(a,b){var c,f=[],g=d(a);if(g?c=e(g,b):(g=new w(a),v.push(g)),c)return c;if(c={},g.value=h(a),b){c.callback=b,c.next=null;var i=this.intervals||[100,1e3,1e4,6e4];if(void 0===i.push)throw new OriginalError("jsonpatch.intervals must be an array");var k=0,l=function(){j(c)},m=function(){clearTimeout(c.next),c.next=setTimeout(function(){l(),k=0,c.next=setTimeout(n,i[k++])},0)},n=function(){l(),k==i.length&&(k=i.length-1),c.next=setTimeout(n,i[k++])};"undefined"!=typeof window&&(window.addEventListener?(window.addEventListener("mousedown",m),window.addEventListener("mouseup",m),window.addEventListener("keydown",m)):(document.documentElement.attachEvent("onmousedown",m),document.documentElement.attachEvent("onmouseup",m),document.documentElement.attachEvent("onkeydown",m))),c.next=setTimeout(n,i[k++])}return c.patches=f,c.object=a,g.observers.push(new x(b,c)),c}function j(a){for(var b,c=0,d=v.length;d>c;c++)if(v[c].obj===a.object){b=v[c];break}k(b.value,a.object,a.patches,""),a.patches.length&&m(b.value,a.patches);var e=a.patches;return e.length>0&&(a.patches=[],a.callback&&a.callback(e)),e}function k(a,b,d,e){for(var f=r(b),g=r(a),i=!1,j=!1,l=g.length-1;l>=0;l--){var m=g[l],n=a[m];if(b.hasOwnProperty(m)){var o=b[m];"object"==typeof n&&null!=n&&"object"==typeof o&&null!=o?k(n,o,d,e+"/"+c(m)):n!=o&&(i=!0,d.push({op:"replace",path:e+"/"+c(m),value:h(o)}))}else d.push({op:"remove",path:e+"/"+c(m)}),j=!0}if(j||f.length!=g.length)for(var l=0;l<f.length;l++){var m=f[l];a.hasOwnProperty(m)||d.push({op:"add",path:e+"/"+c(m),value:h(b[m])})}}function l(a){for(var b,c=0,d=a.length;d>c;){b=a.charCodeAt(c);{if(!(b>=48&&57>=b))return!1;c++}}return!0}function m(a,b,c){for(var d,e,f=!1,g=0,h=b.length;h>g;){d=b[g],g++;for(var i=d.path||"",j=i.split("/"),k=a,m=1,n=j.length,o=void 0;;){if(e=j[m],c&&void 0===o&&(void 0===k[e]?o=j.slice(0,m).join("/"):m==n-1&&(o=d.path),void 0!==o&&this.validator(d,g-1,a,o)),m++,void 0===e&&m>=n){f=u[d.op].call(d,k,e,a);break}if(y(k)){if("-"===e)e=k.length;else{if(c&&!l(e))throw new z("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index","OPERATION_PATH_ILLEGAL_ARRAY_INDEX",g-1,d.path,d);e=parseInt(e,10)}if(m>=n){if(c&&"add"===d.op&&e>k.length)throw new z("The specified index MUST NOT be greater than the number of elements in the array","OPERATION_VALUE_OUT_OF_BOUNDS",g-1,d.path,d);f=t[d.op].call(d,k,e,a);break}}else if(e&&-1!=e.indexOf("~")&&(e=e.replace(/~1/g,"/").replace(/~0/g,"~")),m>=n){f=s[d.op].call(d,k,e,a);break}k=k[e]}}return f}function n(a,b){var c=[];return k(a,b,c,""),c}function o(a){if(void 0===a)return!0;if("array"==typeof a||"object"==typeof a)for(var b in a)if(o(a[b]))return!0;return!1}function p(b,c,d,e){if("object"!=typeof b||null===b||y(b))throw new z("Operation is not an object","OPERATION_NOT_AN_OBJECT",c,b,d);if(!s[b.op])throw new z("Operation `op` property is not one of operations defined in RFC-6902","OPERATION_OP_INVALID",c,b,d);if("string"!=typeof b.path)throw new z("Operation `path` property is not a string","OPERATION_PATH_INVALID",c,b,d);if(("move"===b.op||"copy"===b.op)&&"string"!=typeof b.from)throw new z("Operation `from` property is not present (applicable in `move` and `copy` operations)","OPERATION_FROM_REQUIRED",c,b,d);if(("add"===b.op||"replace"===b.op||"test"===b.op)&&void 0===b.value)throw new z("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_REQUIRED",c,b,d);if(("add"===b.op||"replace"===b.op||"test"===b.op)&&o(b.value))throw new z("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED",c,b,d);if(d)if("add"==b.op){var f=b.path.split("/").length,g=e.split("/").length;if(f!==g+1&&f!==g)throw new z("Cannot perform an `add` operation at the desired path","OPERATION_PATH_CANNOT_ADD",c,b,d)}else if("replace"===b.op||"remove"===b.op||"_get"===b.op){if(b.path!==e)throw new z("Cannot perform the operation at a path that does not exist","OPERATION_PATH_UNRESOLVABLE",c,b,d)}else if("move"===b.op||"copy"===b.op){var h={op:"_get",path:b.from,value:void 0},i=a.validate([h],d);if(i&&"OPERATION_PATH_UNRESOLVABLE"===i.name)throw new z("Cannot perform the operation from a path that does not exist","OPERATION_FROM_UNRESOLVABLE",c,b,d)}}function q(a,b){try{if(!y(a))throw new z("Patch sequence must be an array","SEQUENCE_NOT_AN_ARRAY");if(b)b=JSON.parse(JSON.stringify(b)),m.call(this,b,a,!0);else for(var c=0;c<a.length;c++)this.validator(a[c],c)}catch(d){if(d instanceof z)return d;throw d}}if(!a.observe){var r=function(a){if(y(a)){for(var b=new Array(a.length),c=0;c<b.length;c++)b[c]=c.toString();return b}if(Object.keys)return Object.keys(a);var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b},s={add:function(a,b){return a[b]=this.value,!0},remove:function(a,b){return delete a[b],!0},replace:function(a,b){return a[b]=this.value,!0},move:function(a,b,c){var d={op:"_get",path:this.from};return m(c,[d]),m(c,[{op:"remove",path:this.from}]),m(c,[{op:"add",path:this.path,value:d.value}]),!0},copy:function(a,b,c){var d={op:"_get",path:this.from};return m(c,[d]),m(c,[{op:"add",path:this.path,value:d.value}]),!0},test:function(a,c){return b(a[c],this.value)},_get:function(a,b){this.value=a[b]}},t={add:function(a,b){return a.splice(b,0,this.value),!0},remove:function(a,b){return a.splice(b,1),!0},replace:function(a,b){return a[b]=this.value,!0},move:s.move,copy:s.copy,test:s.test,_get:s._get},u={add:function(a){u.remove.call(this,a);for(var b in this.value)this.value.hasOwnProperty(b)&&(a[b]=this.value[b]);return!0},remove:function(a){for(var b in a)a.hasOwnProperty(b)&&s.remove.call(this,a,b);return!0},replace:function(a){return m(a,[{op:"remove",path:this.path}]),m(a,[{op:"add",path:this.path,value:this.value}]),!0},move:s.move,copy:s.copy,test:function(a){return JSON.stringify(a)===JSON.stringify(this.value)},_get:function(a){this.value=a}},v=[],w=function(){function a(a){this.observers=[],this.obj=a}return a}(),x=function(){function a(a,b){this.callback=a,this.observer=b}return a}();a.unobserve=g,a.observe=i,a.generate=j;var y;y=Array.isArray?Array.isArray:function(a){return a.push&&"number"==typeof a.length},a.apply=m,a.compare=n;var z=function(a){function b(b,c,d,e,f){a.call(this,b),this.message=b,this.name=c,this.index=d,this.operation=e,this.tree=f}return __extends(b,a),b}(OriginalError);a.JsonPatchError=z,a.Error=z,a.hasUndefined=o,a.validator=p,a.validate=q}}(jsonpatch||(jsonpatch={})),"undefined"!=typeof exports&&(exports.apply=jsonpatch.apply,exports.observe=jsonpatch.observe,exports.unobserve=jsonpatch.unobserve,exports.generate=jsonpatch.generate,exports.compare=jsonpatch.compare,exports.validate=jsonpatch.validate,exports.validator=jsonpatch.validator,exports.JsonPatchError=jsonpatch.JsonPatchError,exports.Error=jsonpatch.Error);


class MixerStore {
	constructor(render){
		this.soundPaths = [];
		this.render = render;
	}

	getSoundPaths() {
		return this.soundPaths;
	}

	addSoundPath(incomingPath){
		this.soundPaths.push(incomingPath);
		this.render();
	}

	updateSoundPath(crate){
		for (var i = 0; i < this.soundPaths.length; i++) {
			var c = this.soundPaths[i];
			if (this.soundPaths[i].path == crate.path) {
				jsonpatch.apply( this.soundPaths[i].data, crate.data );
				this.render();
				return;
			}
		}

	}
}


export class socketManager {
	
	 constructor(callsign, render){

		var proto = window.location.protocol === "https:" ? "wss" : "ws";
		const hostname = "soundctl.com";
		const port = "";
		const subProto = "api";
		const url = proto + "://" + callsign + "." + hostname + ":" + port;
		this.socket = new WebSocket(url, subProto);
		this.dataStore = new MixerStore(render);
		
		this.socket.onopen = this._socketOnOpen.bind(this);
		this.socket.onclose = this._webSocketOnClose.bind(this);
		this.socket.onmessage = this._socketOnMessage.bind(this);
		this.socket.onerror = this._webSocketOnError.bind(this);

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

				this.dataStore.addSoundPath(storeCrate);
				break;

			case "PATCH":
				this.dataStore.updateSoundPath(crate);
				break;

			case "DELETE":

				this.warehouse = this.warehouse.filter(currCrate => {
					return crate.path !== currCrate.path;
				});
				break;
			};
	}

	sendCommand(meth, path, data = {}) {
		let c = Crate(meth, path, data);
		var payload = JSON.stringify(c);
		this.socket.send(payload);
	}

	updateFader(newFaderVal, path) {
		let data = [
			{
				"op": "replace",
				"path": "/afx/0/volume/fader",
				"value": newFaderVal
			},
			{
				"op": "replace",
				"path": "/afx/1/volume/fader",
				"value": newFaderVal
			}
		];

		let crate = Crate('PATCH', path, data)
		this.sendCommand('PATCH', path, data);
		this.dataStore.updateSoundPath(crate);
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