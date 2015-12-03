var request = require('request-promise');

// Generic header Options for Auth0 Requests

function getRequestOptions(){
	var options = {
		url: 'https://soundctl.auth0.com/api/v2/users/google-oauth2%7C',
		headers: {
			'User-Agent': 'request',
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2aVRqUjJIa2hBTFBQb0RmSThmZU4wWjFmbFhKOVlKTyIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInVwZGF0ZSJdfX0sImlhdCI6MTQ0OTAzOTY1NywianRpIjoiNjc1ZDNiNzYxYTE4NWU5MTM4OTQzMGFlOGI5Yzg3NTAifQ.Mt2joRGm8wR-5P5rRwvqb5xsCdiGHo7bNiwJXz2Lfu4'
		}
	}
	return options;
}

var auth0Client = {
	
	// @param userID (Auth0 user_id of a single user)
	// @param AuthToken (Auth0 refresh token)
	getUser: function(userID){
		options = getRequestOptions();
		options.url = options.url + userID;

		request(options, function(error, response, body){
			//TODO: Add error check at this point
			if(!error && response.statusCode == 200) {
			  console.log("Response from getUser", body);
			}
		});
	},

	// 
	updateAppMetaData: function(userID, payLoad){
		options = getRequestOptions();
		console.log('updateAppData called!');
		options['method'] = 'PATCH';
		options['url'] = options.url + userID;
		options['headers']['Content-Type'] = 'application/json';
		options['json'] = {app_metadata: payLoad}

		console.log("updateAppData request options:", options);
		
		return request(options)
			.then(function(response){
				return response;
			})
			.catch(function(err){
				console.error(err);
			})

	}
}

module.exports = auth0Client;