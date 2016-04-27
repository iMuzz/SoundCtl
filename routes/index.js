var express = require('express');
var router = express.Router();
var requiresLogin = require('../requiresLogin');
var request = require('request');
var chalk = require('chalk'); 

var stationManager = require('../modules/stationManager');
var kradEngine = require('../modules/kradEngine');
var auth0Client = require('../modules/auth0Client');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/user', function(req, res, next){
  //Get user from Auth0
  //If callsign exists, return user object with appropriate information
  //If it doesn't exist, have middleware create, and store in auth0 and then reutrn user object with information
});

router.get('/api/regenerate', function(req, res, next){
  kradEngine.regenerateApiKey('kiwi')
    .then(function(response){
        console.log('response');
        res.status(200).end();
    })
});

router.get('/api/instance', function(req, res, next){
  var userID = req.user.sub;
  console.log(chalk.blue("/api/instance called!:  " +  userID));

  auth0Client.getUserAppData(userID)
    .then(function(response){
      if(response.error) {
        res.status(503).end();
      } else {
        console.log(chalk.green("User App Data recieved in controller: "),  response);
        var apiKey = response.apiKey;
        if (response.callsign !== undefined) { // if instance exists.
          kradEngine.getInstanceStats(response.callsign)
            .then(function(response){
              response = JSON.parse(response);
              response.apiKey = apiKey;
              console.log(chalk.green("\nSending back response: "), response);
              res.send(response);
            });
        } else { // if instance doesn't exist create it and store it on Auth0
          console.log(chalk.yellow('\nUser does not have instance.. Creating new instance..'));
          kradEngine.createAndStartInstance()
            .then(function(response){
              console.log(chalk.green('\n New Instance available in controller: ') + response);
              var parsedJSON =response
              var payLoad = {
                callsign: parsedJSON.id,
                apiKey: parsedJSON.apiKey
              }
              auth0Client.updateAppMetaData(userID, payLoad)
                .then(function(response){
                  console.log(chalk.yellow('\nupdateAppMetaData for user: '),  response);
                  res.send(parsedJSON);
                })
            });
        }
      }
    });
});

// router.get('/createrandstations', function(req, res, next){
//   for (var i = 0; i < 5; i++) {
//     kradEngine.station('soundctl'+i, 'create');
//   };

//   res.status(200).end();
// });

// Destroy all stations (testing purposes)
// router.get('/destroystations', function(req, res, next) {
//   kradEngine.destroyAllStations();
//   res.status(200).end();
// });


module.exports = router;