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

//TODO:  What if an authenticated user tries to regenerate a callsign that doesn't belong to them?
router.put('/api/regenerate', function(req, res, next){
  var callsign = req.body.callsign;
  var userID = req.user.sub;
  kradEngine.regenerateApiKey(callsign)
    .then(function(response){
        res.send(response);
    })
});

router.get('/api/beta', function(req, res, next){
  kradEngine.getBetaUsage()
    .then(function(response){
      console.log(response);
      res.sendStatus(response);
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
      if (response.callsign !== undefined) { // if instance exists.
        var p1 = kradEngine.getInstanceStats(response.callsign);
        var p2 = kradEngine.getApiKey(response.callsign);
        Promise.all([p1,p2])
        .then(function(promiseValues){
          var stats = promiseValues[0];
          var apiKey = promiseValues[1];
          stats.apiKey = apiKey.apiKey;
          res.send(stats);
        });
      } else { // if instance doesn't exist create it and store it on Auth0
        console.log(chalk.yellow('\nUser does not have instance.. Creating new instance..'));
        kradEngine.createAndStartInstance()
        .then(instanceCreationSuccess, instanceCreationFailure);
      }
    }
  });

  function instanceCreationSuccess(response){
    console.log(chalk.green('\n New Instance available in controller: ') + response);
    var parsedJSON = response
    var payLoad = {
      callsign: parsedJSON.id
    };
    auth0Client.updateAppMetaData(userID, payLoad)
    .then(function(response){
      console.log(chalk.yellow('\nupdateAppMetaData for user: '),  response);
      res.send(parsedJSON);
    })
  };

  function instanceCreationFailure(response){
    res.send({message: response})
  };
});

module.exports = router;