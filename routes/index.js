var express = require('express');
var router = express.Router();
var requiresLogin = require('../requiresLogin');
var request = require('request');

var stationManager = require('../modules/stationManager');
var kradEngine = require('../modules/kradEngine');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/player', function(req, res, next) {
  res.render('player', { title: 'Express' });
});

// router.get('/dashboard', requiresLogin, function(req, res, next) {
//   res.render('dashboard', {user: req.user});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {user: req.user});
});


// Accepts station name
router.post('/stations', requiresLogin, function(req, res, next){
  console.log("callsign chosen by user:", req.body.callsign);
  console.log("Station creator:", req.user);

  stationManager.createStation(req.user.identities[0].user_id, req.body.callsign)
    .then(function(response){
      console.log("Station has been created!");
      res.status(200).end();
    });
});

router.get('/websocket', function(req, res, next) {
  res.render('websocket');
});


router.get('/createrandstations', function(req, res, next){
  for (var i = 0; i < 5; i++) {
    kradEngine.station('soundctl'+i, 'create');
  };

  res.status(200).end();
});

// Destroy all stations (testing purposes)
router.get('/destroystations', function(req, res, next) {
  kradEngine.destroyAllStations();
  res.status(200).end();
});


module.exports = router;