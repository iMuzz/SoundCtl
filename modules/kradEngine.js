// Depenedencies
var http = require('http');

var request = require('request');
require('dotenv').load();

// Generic request options
var requestOptions = {
	url: 'http://api.soundctl.com/',
	headers: {
		'User-Agent': 'request'
	}
}

/*
	A simple wrapper around the KradEngine middleware
*/

var kradEngine = {
	// Returns a list of all created stations
	getAllStations: function(){
		requestOptions.url = requestOptions.url + 'stations?key=' + process.env.soundCtlKey;
		
		return request(requestOptions, function(error, response, body){
			// console.log(body);
			if(error) {};

			if (!error) {
				console.log('response from middleware', body);
			};
		});
	},
	createStation: function(stationName){},
	startStation: function(stationName){},
	stopStation: function(stationName){},
	destroyStation: function(stationName){}
}


module.exports = kradEngine;