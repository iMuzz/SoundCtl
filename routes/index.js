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

router.get('/api/stations', function(req, res, next){
  var userID = req.user.sub;
  console.log(chalk.blue("/api/stations called!:  " +  userID));

  auth0Client.getUserAppData(userID)
    .then(function(response){
      if(response.error) {
        res.status(503).end();
      } else {
        console.log(chalk.green("User App Data recieved in controller: "),  response);
        if (response.callsign !== undefined) { // if instance exists.
          kradEngine.getInstanceStats(response.callsign)
            .then(function(response){
              console.log(chalk.green("\nSending back response: ") + response);
              res.send(response);
            });
        } else {
          console.log(chalk.yellow('\nUser does not have instance.. Creating new instance..'));
          kradEngine.createInstance()
            .then(function(response){
              if (response.error) {
                res.status(503).end();
              } else {
                console.log(chalk.green('\n New Instance available in controller: ') + response);
                var parsedJSON = JSON.parse(response)
                var payLoad = {
                  callsign: parsedJSON.id,
                  apiKey: parsedJSON.apiKey
                }
                auth0Client.updateAppMetaData(userID, payLoad)
                  .then(function(response){
                    console.log(chalk.yellow('\nupdateAppMetaData for user: '),  response);
                    res.send({"id":parsedJSON.id,"clients":0,"transfer":0});
                  })
              }
            });
        }
      }
    });
});

// router.post('/api/stations', function(req, res, next){
//   var userId = parseGoogleUserID(req.user.sub);

//   stationManager.createStation(userId, req.body.callsign)
//     .then(function(response){
//       res.status(200).end();
//     })
// });

// router.delete('/api/stations/:callsign', function(req, res, next){
//   var userId = parseGoogleUserID(req.user.sub);

//   stationManager.deleteStation(userId, req.params.callsign)
//     .then(function(response){
//       res.status(200).end();
//     })
// });


// router.get('/websocket', function(req, res, next) {
//   res.render('websocket');
// });


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