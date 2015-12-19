import React from         'react';
import ReactDom from      'react-dom';
import $ from             'jquery';
import {Navbar} from      './components/navbar';
import {Dashboard} from   './components/dashboard';

let sinewave = require('./modules/sinewave');

// import {soundCtlStation} from './modules/websocket';


var station;
var react_soundpathmanger;

var __extends=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},OriginalError=Error,jsonpatch;!function(a){function b(a,c){switch(typeof a){case"undefined":case"boolean":case"string":case"number":return a===c;case"object":if(null===a)return null===c;if(y(a)){if(!y(c)||a.length!==c.length)return!1;for(var d=0,e=a.length;e>d;d++)if(!b(a[d],c[d]))return!1;return!0}var f=r(c),g=f.length;if(r(a).length!==g)return!1;for(var d=0;g>d;d++)if(!b(a[d],c[d]))return!1;return!0;default:return!1}}function c(a){return-1===a.indexOf("/")&&-1===a.indexOf("~")?a:a.replace(/~/g,"~0").replace(/\//g,"~1")}function d(a){for(var b=0,c=v.length;c>b;b++)if(v[b].obj===a)return v[b]}function e(a,b){for(var c=0,d=a.observers.length;d>c;c++)if(a.observers[c].callback===b)return a.observers[c].observer}function f(a,b){for(var c=0,d=a.observers.length;d>c;c++)if(a.observers[c].observer===b)return void a.observers.splice(c,1)}function g(a,b){j(b),clearTimeout(b.next);var c=d(a);f(c,b)}function h(a){return"object"==typeof a?JSON.parse(JSON.stringify(a)):a}function i(a,b){var c,f=[],g=d(a);if(g?c=e(g,b):(g=new w(a),v.push(g)),c)return c;if(c={},g.value=h(a),b){c.callback=b,c.next=null;var i=this.intervals||[100,1e3,1e4,6e4];if(void 0===i.push)throw new OriginalError("jsonpatch.intervals must be an array");var k=0,l=function(){j(c)},m=function(){clearTimeout(c.next),c.next=setTimeout(function(){l(),k=0,c.next=setTimeout(n,i[k++])},0)},n=function(){l(),k==i.length&&(k=i.length-1),c.next=setTimeout(n,i[k++])};"undefined"!=typeof window&&(window.addEventListener?(window.addEventListener("mousedown",m),window.addEventListener("mouseup",m),window.addEventListener("keydown",m)):(document.documentElement.attachEvent("onmousedown",m),document.documentElement.attachEvent("onmouseup",m),document.documentElement.attachEvent("onkeydown",m))),c.next=setTimeout(n,i[k++])}return c.patches=f,c.object=a,g.observers.push(new x(b,c)),c}function j(a){for(var b,c=0,d=v.length;d>c;c++)if(v[c].obj===a.object){b=v[c];break}k(b.value,a.object,a.patches,""),a.patches.length&&m(b.value,a.patches);var e=a.patches;return e.length>0&&(a.patches=[],a.callback&&a.callback(e)),e}function k(a,b,d,e){for(var f=r(b),g=r(a),i=!1,j=!1,l=g.length-1;l>=0;l--){var m=g[l],n=a[m];if(b.hasOwnProperty(m)){var o=b[m];"object"==typeof n&&null!=n&&"object"==typeof o&&null!=o?k(n,o,d,e+"/"+c(m)):n!=o&&(i=!0,d.push({op:"replace",path:e+"/"+c(m),value:h(o)}))}else d.push({op:"remove",path:e+"/"+c(m)}),j=!0}if(j||f.length!=g.length)for(var l=0;l<f.length;l++){var m=f[l];a.hasOwnProperty(m)||d.push({op:"add",path:e+"/"+c(m),value:h(b[m])})}}function l(a){for(var b,c=0,d=a.length;d>c;){b=a.charCodeAt(c);{if(!(b>=48&&57>=b))return!1;c++}}return!0}function m(a,b,c){for(var d,e,f=!1,g=0,h=b.length;h>g;){d=b[g],g++;for(var i=d.path||"",j=i.split("/"),k=a,m=1,n=j.length,o=void 0;;){if(e=j[m],c&&void 0===o&&(void 0===k[e]?o=j.slice(0,m).join("/"):m==n-1&&(o=d.path),void 0!==o&&this.validator(d,g-1,a,o)),m++,void 0===e&&m>=n){f=u[d.op].call(d,k,e,a);break}if(y(k)){if("-"===e)e=k.length;else{if(c&&!l(e))throw new z("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index","OPERATION_PATH_ILLEGAL_ARRAY_INDEX",g-1,d.path,d);e=parseInt(e,10)}if(m>=n){if(c&&"add"===d.op&&e>k.length)throw new z("The specified index MUST NOT be greater than the number of elements in the array","OPERATION_VALUE_OUT_OF_BOUNDS",g-1,d.path,d);f=t[d.op].call(d,k,e,a);break}}else if(e&&-1!=e.indexOf("~")&&(e=e.replace(/~1/g,"/").replace(/~0/g,"~")),m>=n){f=s[d.op].call(d,k,e,a);break}k=k[e]}}return f}function n(a,b){var c=[];return k(a,b,c,""),c}function o(a){if(void 0===a)return!0;if("array"==typeof a||"object"==typeof a)for(var b in a)if(o(a[b]))return!0;return!1}function p(b,c,d,e){if("object"!=typeof b||null===b||y(b))throw new z("Operation is not an object","OPERATION_NOT_AN_OBJECT",c,b,d);if(!s[b.op])throw new z("Operation `op` property is not one of operations defined in RFC-6902","OPERATION_OP_INVALID",c,b,d);if("string"!=typeof b.path)throw new z("Operation `path` property is not a string","OPERATION_PATH_INVALID",c,b,d);if(("move"===b.op||"copy"===b.op)&&"string"!=typeof b.from)throw new z("Operation `from` property is not present (applicable in `move` and `copy` operations)","OPERATION_FROM_REQUIRED",c,b,d);if(("add"===b.op||"replace"===b.op||"test"===b.op)&&void 0===b.value)throw new z("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_REQUIRED",c,b,d);if(("add"===b.op||"replace"===b.op||"test"===b.op)&&o(b.value))throw new z("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)","OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED",c,b,d);if(d)if("add"==b.op){var f=b.path.split("/").length,g=e.split("/").length;if(f!==g+1&&f!==g)throw new z("Cannot perform an `add` operation at the desired path","OPERATION_PATH_CANNOT_ADD",c,b,d)}else if("replace"===b.op||"remove"===b.op||"_get"===b.op){if(b.path!==e)throw new z("Cannot perform the operation at a path that does not exist","OPERATION_PATH_UNRESOLVABLE",c,b,d)}else if("move"===b.op||"copy"===b.op){var h={op:"_get",path:b.from,value:void 0},i=a.validate([h],d);if(i&&"OPERATION_PATH_UNRESOLVABLE"===i.name)throw new z("Cannot perform the operation from a path that does not exist","OPERATION_FROM_UNRESOLVABLE",c,b,d)}}function q(a,b){try{if(!y(a))throw new z("Patch sequence must be an array","SEQUENCE_NOT_AN_ARRAY");if(b)b=JSON.parse(JSON.stringify(b)),m.call(this,b,a,!0);else for(var c=0;c<a.length;c++)this.validator(a[c],c)}catch(d){if(d instanceof z)return d;throw d}}if(!a.observe){var r=function(a){if(y(a)){for(var b=new Array(a.length),c=0;c<b.length;c++)b[c]=c.toString();return b}if(Object.keys)return Object.keys(a);var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b},s={add:function(a,b){return a[b]=this.value,!0},remove:function(a,b){return delete a[b],!0},replace:function(a,b){return a[b]=this.value,!0},move:function(a,b,c){var d={op:"_get",path:this.from};return m(c,[d]),m(c,[{op:"remove",path:this.from}]),m(c,[{op:"add",path:this.path,value:d.value}]),!0},copy:function(a,b,c){var d={op:"_get",path:this.from};return m(c,[d]),m(c,[{op:"add",path:this.path,value:d.value}]),!0},test:function(a,c){return b(a[c],this.value)},_get:function(a,b){this.value=a[b]}},t={add:function(a,b){return a.splice(b,0,this.value),!0},remove:function(a,b){return a.splice(b,1),!0},replace:function(a,b){return a[b]=this.value,!0},move:s.move,copy:s.copy,test:s.test,_get:s._get},u={add:function(a){u.remove.call(this,a);for(var b in this.value)this.value.hasOwnProperty(b)&&(a[b]=this.value[b]);return!0},remove:function(a){for(var b in a)a.hasOwnProperty(b)&&s.remove.call(this,a,b);return!0},replace:function(a){return m(a,[{op:"remove",path:this.path}]),m(a,[{op:"add",path:this.path,value:this.value}]),!0},move:s.move,copy:s.copy,test:function(a){return JSON.stringify(a)===JSON.stringify(this.value)},_get:function(a){this.value=a}},v=[],w=function(){function a(a){this.observers=[],this.obj=a}return a}(),x=function(){function a(a,b){this.callback=a,this.observer=b}return a}();a.unobserve=g,a.observe=i,a.generate=j;var y;y=Array.isArray?Array.isArray:function(a){return a.push&&"number"==typeof a.length},a.apply=m,a.compare=n;var z=function(a){function b(b,c,d,e,f){a.call(this,b),this.message=b,this.name=c,this.index=d,this.operation=e,this.tree=f}return __extends(b,a),b}(OriginalError);a.JsonPatchError=z,a.Error=z,a.hasUndefined=o,a.validator=p,a.validate=q}}(jsonpatch||(jsonpatch={})),"undefined"!=typeof exports&&(exports.apply=jsonpatch.apply,exports.observe=jsonpatch.observe,exports.unobserve=jsonpatch.unobserve,exports.generate=jsonpatch.generate,exports.compare=jsonpatch.compare,exports.validate=jsonpatch.validate,exports.validator=jsonpatch.validator,exports.JsonPatchError=jsonpatch.JsonPatchError,exports.Error=jsonpatch.Error);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.setupAjax = this.setupAjax.bind(this);
		this.createLock = this.createLock.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.getIdToken = this.getIdToken.bind(this);
	}
	componentWillMount() {
		this.setupAjax();
		this.createLock();
		
		this.setState({ idToken: this.getIdToken()});
	}
	setupAjax() {
		$.ajaxSetup({
			'beforeSend': function(xhr) {
				if (localStorage.getItem('userToken')) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
				}
			}
		});
	}
	createLock() {
		this.lock = new Auth0Lock("da8oL0bZSljscKr94Oq11W7P7AiTvb4L", "soundctl.auth0.com");
	}
	getIdToken() {
		var idToken = localStorage.getItem('userToken');
		var authHash = this.lock.parseHash(window.location.hash);
		if (!idToken && authHash) {
			if (authHash.id_token) {
				idToken = authHash.id_token
				localStorage.setItem('userToken', authHash.id_token);
			}
			if (authHash.error) {
				console.log("Error signing in", authHash);
			}
		}
		return idToken;
	}
	render() {
		// this.state.idToken = null;
		if (this.state.idToken) {
			// If user is logged in 
			return (<Dashboard lock={this.lock} idToken={this.state.idToken}/>);
		} else {
			// If user is not logged in
			return ( <div> <Home lock={this.lock}/> </div> );
		}
	}
}

class Home extends React.Component {
	constructor(props){
		super(props);

		this.showLock = this.showLock.bind(this);
	}
	showLock() {
		this.props.lock.show();
	}

	componentDidMount(){
		new sinewave({
			width: 1000,
			height: 300,
			speed: 0.009,
			container: document.getElementById('sinewave'),
			autostart: true,
		});
	}

	render() {
		return (
			<div>
				<nav className="nav">
					<div className="nav-item"> SoundCtl </div>
					<div className="nav-right"> 
						<div className="nav-item" onClick={this.showLock}> Login </div>
					</div>
				</nav>
				<div className="hero-wrapper"> 
					<div className="bg-hero bg-hero-1"></div>
					<div className="hero-content">
						<div className="company"> SoundCtl </div>
						<div className="hero-title"> This simplest way to broadcast your ideas <span className="bright"> live </span> </div>
						<form id="mc-embedded-subscribe-form" action="//SoundCtl.us12.list-manage.com/subscribe/post?u=be4c8e8b746c8bbb27b92210e&amp;id=7228dc16ba" name="mc-embedded-subscribe-form" method="post" target="_blank">
							<input placeholder="Enter email address" type="email" name="EMAIL" required/>
							<input className="cta-base" type="submit" value="Signup"/>
						</form>
					</div>
					<div id="sinewave" className="container"></div>
				</div>
			</div>
		)
	}
}

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
	 console.log(crate.meth + " " + crate.path);

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
				for (var i = 0; i < this.warehouse.length; i++) {
					var c = this.warehouse[i];
					if (this.warehouse[i].path == crate.path) {
						// this.warehouse[i].data = crate.data;
						console.log("Patching...: " + crate.path);
						console.log("BEFORE: ", station.warehouse[i].data);
						jsonpatch.apply( station.warehouse[i].data, crate.data );
						console.log("AFTER: ", station.warehouse[i].data);
						cake();
						return;
					}
				}
				console.log("Patch Fail: " + crate.path);
				break;
			case "DELETE":
				this.warehouse = this.warehouse.filter(currCrate => {
					return crate.path !== currCrate.path;
				});
				break;
			};
		console.log("Warehouse contains " + this.warehouse.length + " crates: ", this.warehouse);
		console.log("Number of patches " + this.patches);
		cake();
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

class SoundPath extends React.Component {
	constructor(props) {
		console.log("i am constructing")
		super(props);
		this.state = props.data;
		//this.increase = this.increase.bind(this);
		//this.decrease = this.decrease.bind(this);
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(newval) {
		console.log("handle change newval is: " + newval)
		this.setState({ afx: [{volume: { fader: newval}}]});
		//this.state.afx[0].volume.fader = newval;
		let data = [
			{
				"op": "replace",
				"path": "/afx/0/volume/fader",
				"value": parseInt(newval)
			},
			{
				"op": "replace",
				"path": "/afx/1/volume/fader",
				"value": parseInt(newval)
			}
		];
		station.sendCommand('PATCH',this.props.path, data);
	}

	render() {
		console.log("rendering ")
		var valueLink = {
			value: this.state.afx[0].volume.fader,
            requestChange: this.handleChange
        };
		return(
			<div className="path-wrap">
				<h4>key {this.key} :: path {this.props.path}</h4>
				<input type="number" valueLink={valueLink} min="-50" max="0" step="1"/>
				<div> ----- value: {this.state.afx[0].volume.fader}</div>
			</div>
		);
	}
}


$(document).ready(function(){
	if (document.getElementById('home')) {
		ReactDom.render(<App />, document.getElementById('home'));
	}
	station = new soundCtlStation('dev');
    // react_soundpathmanger = ReactDom.render(<SoundPathManager soundPaths={station.warehouse}/>, document.getElementById('mixers'));
    setTimeout(function(){
    	let path = station.warehouse[0];
    	react_soundpathmanger = ReactDom.render(<SoundPath data={path.data} path={path.path}/>, document.getElementById('mixers'));
    }, 1000)
});

function cake() {
    let path = station.warehouse[0];
	react_soundpathmanger.setState({ data: path.data});
	react_soundpathmanger.forceUpdate();
}

// class SoundPathManager extends React.Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {soundpaths: this.props.soundPaths};
// 	}

// 	render(){

// 		let pathNodes = this.state.soundpaths.map(function(currEl){
// 			var key = currEl.path;
// 			// console.log("Sound Path Key: ", key);

// 			return (
// 				<SoundPath data={currEl.data} key={key} path={key} propcopy={this.state}/>
// 			);
// 		});
// 		return (
// 			<div>
// 				{pathNodes}
// 			</div>
// 		);
// 	}
// }