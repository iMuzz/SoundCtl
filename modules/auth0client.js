var request = require('request');

auth0Client = {
	
	// @param userID (Auth0 user_id of a single user)
	// @param AuthToken (Auth0 refresh token)
	getUser: function(userID){
		var options = {
		  url: 'https://soundctl.auth0.com/api/v2/users' + userID,
		  headers: {
		    'User-Agent': 'request',
		    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2MlRObWZOWTI0VnRXTDBkd2RNMW84aUdkSHd2RGNlUSIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInVwZGF0ZSIsInJlYWQiXX19LCJpYXQiOjE0NDgxOTA4MjcsImp0aSI6ImI1MmM2ZTNhMGMzNjk3ZWZhMDM3MGM0OTEzOTBlMTY1In0.jd4HH5RyYNZ6qA4RNdskRmn4ReLYnQmgnPx-fSaBx2k'
		  }
		};

		request(options, function(error, response, body){
			//TODO: Add error check at this point
			if(!error && response.statusCode == 200) {
			  console.log("Response from getUser", body);
			}
		});
	},

	updateAppData: function(userID, payLoad){
		console.log('updateAppData called!');
		var options = {
		  method: 'PATCH',
		  url: 'https://soundctl.auth0.com/api/v2/users/google-oauth2%7C107749376288480166720',
		  headers: {
		    'User-Agent': 'request',
		    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI2MlRObWZOWTI0VnRXTDBkd2RNMW84aUdkSHd2RGNlUSIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInVwZGF0ZSIsInJlYWQiXX19LCJpYXQiOjE0NDgxOTA4MjcsImp0aSI6ImI1MmM2ZTNhMGMzNjk3ZWZhMDM3MGM0OTEzOTBlMTY1In0.jd4HH5RyYNZ6qA4RNdskRmn4ReLYnQmgnPx-fSaBx2k',
		    'Content-Type': 'application/json'
		  },
		  json: {app_metadata: JSON.parse(payLoad)}
		};

		request(options, function(error, response, body){
			if(error) {
				console.log(body);
			}
			//TODO: Add error check at this point
			if(!error && response.statusCode == 200) {
			  console.log("Response from getUser", body);
			}
		});

	}
}

module.exports = auth0Client;