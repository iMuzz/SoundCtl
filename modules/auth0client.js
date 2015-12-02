var request = require('request');

// Generic header Options for Auth0 Requests
var options = {
	url: 'https://soundctl.auth0.com/api/v2/users/google-oauth2%7C',
	headers: {
		'User-Agent': 'request',
		'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2aVRqUjJIa2hBTFBQb0RmSThmZU4wWjFmbFhKOVlKTyIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInVwZGF0ZSJdfX0sImlhdCI6MTQ0OTAxODExMiwianRpIjoiNzI5ZDI0NDI2NDgyYTRkNmZiNDU4MWVjN2Y3YWU1YzcifQ.o6jQBw6lb4-phi3UNeFDk61sdVJSG8kgJyNS8kwGA50'
	}
}

auth0Client = {
	
	// @param userID (Auth0 user_id of a single user)
	// @param AuthToken (Auth0 refresh token)
	getUser: function(userID){
		options.url = options.url + userID;

		request(options, function(error, response, body){
			//TODO: Add error check at this point
			if(!error && response.statusCode == 200) {
			  console.log("Response from getUser", body);
			}
		});
	},

	updateAppData: function(userID, payLoad){
		// console.log('updateAppData called!');
		options['method'] = 'PATCH';
		options['url'] = options.url + userID;
		options['headers']['Content-Type'] = 'application/json';
		options['json'] = {app_metadata: JSON.parse(payLoad)}


		// console.log('Updating app_metadata...');

		request(options, function(error, response, body){
			console.log("APP_METADATA", body)
			if(error) {
				console.log("update failed", body);
			}
			//TODO: Add error check at this point
			if(!error && response.statusCode == 200) {
			  console.log("Response from getUser", body);
			}
		});

	}
}

module.exports = auth0Client;