// Depenedencies
var request = require('request-promise');
require('dotenv').load();

// Generic request options
var requestOptions = {
	url: 'http://api.soundctl.com/',
	headers: {
		'User-Agent': 'request'
	}
}

var soundCtlKey = process.env.soundCtlKey;

/*
	A simple wrapper around the KradEngine middleware.
	
	Note: All methods initially return a promise.
*/
var kradEngine = {
	// Returns a list of all created stations
	getAllStations: function(){
		requestOptions.url = requestOptions.url + 'stations?key=' + soundCtlKey;
		return request(requestOptions)

			// Any kind of data extraction / processing will happen here
			.then(function(response){
				return response;
			});
	},

	station: function(callsign, action){
		console.log('station called!', action);
		requestOptions['url'] = requestOptions.url + action
		requestOptions['method'] = 'POST';
		requestOptions['headers']['Content-Type'] = 'application/json';
		requestOptions['json'] = {
			callsign: callsign,
			key: soundCtlKey
		};

		return request(requestOptions)
			.then(function(response){
				return response;
			})
			.catch(function(err){
				console.log(err);
			})
	}
}


module.exports = kradEngine;