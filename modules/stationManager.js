var request = require('request-promise');
var auth0Client = require('./auth0Client');
var kradEngine = require('./kradEngine');

var stationManager = {
	
	// Get all station associated with a user
	getStations: function(userID){

	},

	createStation: function(userID, callsign){
		// Create station through kradengine
		// Then create stations object and add it to auth0 app_metadata
		console.log("Station Name", callsign);
		console.log('kradengine create!');
		var prom =  kradEngine.station(callsign, 'create')
			.then(function(response){
				console.log('kradEngine resp', response);
				console.log('kradengine succeeded');
				return updateUserStation(userID, callsign);
			})

		function updateUserStation(userID, callsign) {
			var station = {
				"station": callsign
			};

			return auth0Client.updateAppMetaData(userID, station)
				.then(function(response){
					console.log("app_metadata updated!");
					console.log(prom);
				});
		}

		return prom;
	} 
}

module.exports = stationManager;