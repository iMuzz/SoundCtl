var express = require('express');
var router = express.Router();
var passport = require('passport');
var requiresLogin = require('../requiresLogin');
var request = require('request');
var auth0Client = require('../modules/auth0Client');
var kradEngine = require('../modules/kradEngine');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/player', function(req, res, next) {
  res.render('player', { title: 'Express' });
});

router.get('/dashboard', requiresLogin, function(req, res, next) {
  res.render('dashboard', {user: req.user});
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/player' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    console.log(req.user);
    res.redirect('/dashboard');
  });

// Accepts station name
router.post('/stations', requiresLogin, function(req, res, next){

});

router.post('/updateUser', function(req, res, next) {
  auth0Client.updateAppMetaData(req.user.identities[0].user_id, req.body.app_metadata);
  res.redirect('/dashboard');
});



// Stations

router.get('/stations', function(req, res, next){
  kradEngine.getAllStations()
    .then(function(response){
      console.log(response);
    });
});

// router.get('/stations', function(req, res, next){

//   kradEngine.station('test2', 'destroy')
//     .then(function(response){
//       console.log(response);
//     });
// });

module.exports = router;