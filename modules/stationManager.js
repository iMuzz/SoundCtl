var request = require('request-promise');
var auth0Client = require('./auth0Client');
var kradEngine = require('./kradEngine');

var SHOULD_AUTO_START = true;

var stationManager = {
	
	// Get all station associated with a user
	getStations: function(userID){

	},

	createStation: function(userID, callsign){
		// Create station through kradengine
		// Then create stations object and add it to auth0 app_metadata
		var prom =  kradEngine.station(callsign, 'create')
			.then(function(response){
				if (SHOULD_AUTO_START) {
					kradEngine.station(callsign, 'start')
				};
				return updateUserStation(userID, callsign);
			})

		function updateUserStation(userID, callsign) {
			var station = {
				"station": callsign
			};

			return auth0Client.updateAppMetaData(userID, station)
				.then(function(response){
					console.log("app_metadata updated!");
					console.log(response);
				});
		}

		return prom;
	} 
}

module.exports = stationManager;