// Depenedencies
var request = require('request-promise');
require('dotenv').load();

// Generic request options

function getRequestOptions(){
	var requestOptionsObj = {
		url: 'https://api.soundctl.com/',
		headers: {
			'User-Agent': 'request'
		}
	}

	return requestOptionsObj;
	
}

var soundCtlKey = process.env.soundCtlKey;

/*
	A simple wrapper around the KradEngine middleware.
	
	Note: All methods initially return a promise.
*/
var kradEngine = {
	// Returns a list of all created stations
	getAllStations: function(){
		requestOptions = getRequestOptions();
		requestOptions.url = requestOptions.url + 'stations?key=' + soundCtlKey;
		return request(requestOptions)

			// Any kind of data extraction / processing will happen here
			.then(function(response){
				return response;
			});
	},

	station: function(callsign, action){
		console.log('station called!', action);
		requestOptions = getRequestOptions();

		requestOptions['url'] = requestOptions.url + action
		requestOptions['method'] = 'POST';
		requestOptions['headers']['Content-Type'] = 'application/json';
		requestOptions['json'] = {
			callsign: callsign,
			key: soundCtlKey
		};

		console.log("requestOptions", requestOptions);
		return request(requestOptions)
			.then(function(response){
				return response;
			})
			.catch(function(err){
				console.log(err);
			})
	},

	destroyAllStations: function(){
		// console.log('\033[31m', 'sometext' ,'\033[91m');
		var that = this;
		this.getAllStations()
			.then(function(response){
				var stations = JSON.parse(response);
				for(var i = 0; i < stations.length; i++) {
					console.log('destroying...', stations[i]);
					that.station(stations[i], 'destroy');
					// break; //Uncomment to destroy only one stations
				}
			})
	}
}


module.exports = kradEngine;