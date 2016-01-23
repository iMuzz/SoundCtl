var express = require('express');
var router = express.Router();
var requiresLogin = require('../requiresLogin');
var request = require('request');

var stationManager = require('../modules/stationManager');
var kradEngine = require('../modules/kradEngine');
var auth0Client = require('../modules/auth0Client');

function parseGoogleUserID(token){
	 return token.replace("google-oauth2|", "");
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/player', function(req, res, next) {
  res.render('player', { title: 'Express' });
});

router.get('/api/stations', function(req, res, next){
	var userId = parseGoogleUserID(req.user.sub);

	auth0Client.getUserAppData(userId)
		.then(function(response){
			if(response.error) {
				res.status(503).end();
			} else {
				console.log("app data: ", response);
				res.send(response);
			}
		});
});

router.post('/api/stations', function(req, res, next){
  var userId = parseGoogleUserID(req.user.sub);

  stationManager.createStation(userId, req.body.callsign)
    .then(function(response){
      res.status(200).end();
    })
});

router.delete('/api/stations/:callsign', function(req, res, next){
  var userId = parseGoogleUserID(req.user.sub);

  stationManager.deleteStation(userId, req.params.callsign)
    .then(function(response){
      res.status(200).end();
    })
});


router.get('/websocket', function(req, res, next) {
  res.render('websocket');
});


// router.get('/createrandstations', function(req, res, next){
//   for (var i = 0; i < 5; i++) {
//     kradEngine.station('soundctl'+i, 'create');
//   };

//   res.status(200).end();
// });

// // Destroy all stations (testing purposes)
// router.get('/destroystations', function(req, res, next) {
//   kradEngine.destroyAllStations();
//   res.status(200).end();
// });


module.exports = router;