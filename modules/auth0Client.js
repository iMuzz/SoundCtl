var request = require('request-promise');
var chalk = require('chalk'); //module used to change color of errors in terminal

require('dotenv').load();

// Generic header Options for Auth0 Requests
function getRequestOptions(){
  var options = {
    url: 'https://soundctl.auth0.com/api/v2/users/',
    headers: {
      'User-Agent': 'request',
      'Authorization': 'Bearer ' + process.env.auth0JwtToken
    }
  }
  return options;
}

var auth0Client = {

  // @param userID (Auth0 user_id of a single user)
  // Returns a users app_metadata from Auth0
  getUserAppData: function(userID) {
    console.log(chalk.yellow("\nGetting User AppData... "));
    return this.getUser(userID)
      .then(function(response){
        if (response.app_metadata) {
          return response.app_metadata;
        };
        return {callsign: undefined};
      })
  },
  
  // @param userID (Auth0 user_id of a single user)
  // Returns the entire user object from Auth0
  getUser: function(userID){
    options = getRequestOptions();
    options.url = options.url + userID;
    return request(options)
      .then(function(response){
        return JSON.parse(response)
      })
      .catch(function(err){
        console.error(chalk.red('Auth0Client -- ERROR GETTING USER: ' + err.message));
        return err;
      });
  },

  updateAppMetaData: function(userID, payLoad){
    options = getRequestOptions();
    options['method'] = 'PATCH';
    options['url'] = options.url + userID;
    options['headers']['Content-Type'] = 'application/json';
    options['json'] = {app_metadata: payLoad}

    console.log(chalk.yellow("updateAppData request options: "), options);
    
    return request(options)
      .then(function(response){
        return response;
      })
      .catch(function(err){
        console.error(chalk.red('Auth0Client -- ERROR updating app_metadata: ' + err.message));
      })

  }
}

module.exports = auth0Client;