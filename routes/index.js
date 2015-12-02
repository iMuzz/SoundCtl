var express = require('express');
var router = express.Router();
var passport = require('passport');
var requiresLogin = require('../requiresLogin');
var request = require('request');
var auth0Client = require('../modules/auth0Client');

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
  auth0Client.updateAppData(req.user.identities[0].user_id, req.body.app_metadata);
  res.redirect('/dashboard');
});

module.exports = router;