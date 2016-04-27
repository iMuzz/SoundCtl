// Depenedencies
var request = require('request-promise');
var chalk = require('chalk'); 
require('dotenv').load();

// Generic request options

function getRequestOptions(){
  var requestOptionsObj = {
    url: 'https://api.soundctl.io/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'api E1YweNAAiK8w76prs9ZfUGvo0ybTtba9'
    }
  }

  return requestOptionsObj;
  
}

var soundCtlKey = process.env.soundCtlKey;
var DEBUG = process.env.DEBUG;

/*
  A simple wrapper around the KradEngine middleware.
  Note: All methods initially return a promise.
*/

var kradEngine = {
  getAllInstances: function(){
    requestOptions = getRequestOptions();
    requestOptions.url = requestOptions.url + 'instances'
    DEBUG && console.log(chalk.yellow("\n Getting All Instances: " +  requestOptions.url));
    return request(requestOptions)
      .then(function(response){
        DEBUG && console.log(chalk.green("\n Instances received: "), response);
        return response;
    });
  },
  getInstanceStats: function(callsign){
    requestOptions = getRequestOptions();
    requestOptions.url = requestOptions.url + ('stats?id=' + callsign);
    DEBUG && console.log(chalk.yellow("\n Getting Instance Stats with URL: " +  requestOptions.url));
    return request(requestOptions)
      .then(function(response){
        DEBUG && console.log(chalk.green("\n Instance stats received: "), response);
        return response;
    });
  },

  createInstance: function(){
    requestOptions = getRequestOptions();
    requestOptions.url = requestOptions.url + 'create';
    requestOptions['method'] = 'POST';

    DEBUG && console.log("Request Options: ", requestOptions);
    return request(requestOptions)
      .then(function(response){
        DEBUG && console.log(chalk.green("\n Instance created..."), response);
        return response;
      })
      .catch(function(err){
        console.log(err);
      })
  },

  startInstance: function(callsign){
    requestOptions = getRequestOptions();
    requestOptions.url = requestOptions.url + 'start';
    requestOptions['method'] = 'POST';

    requestOptions['json'] = {
      id: callsign
    };

    return request(requestOptions)
      .then(function(response){
        DEBUG && console.log(chalk.green("\n Instance started with callsign: " + callsign), response);
        return response;
      })
      .catch(function(err){
        console.log(err);
      })
  },

  regenerateApiKey: function(callsign){
    requestOptions = getRequestOptions();
    requestOptions.url = requestOptions.url + 'reset';
    requestOptions['method'] = 'POST';

    requestOptions['json'] = {
      id: callsign
    };

    return request(requestOptions)
      .then(function(response){
        DEBUG && console.log(chalk.green("\n API Key regenerated for callsign: " + callsign), response);
        return response;
      })
      .catch(function(err){
        console.log(err);
      })
  },

  createAndStartInstance: function(){
    var that = this;
    return this.createInstance()
      .then(function(response){
        var jsonResponse = JSON.parse(response);
        return that.startInstance(jsonResponse.id)
        .then(function(startResponse){
          return that.getInstanceStats(jsonResponse.id)
            .then(function(res){
              var parsedResponse = JSON.parse(res);
              parsedResponse.apiKey = jsonResponse.apiKey;
              parsedResponse.startedAt = Date.now();
              return parsedResponse;
            })
        })
      });
  },

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