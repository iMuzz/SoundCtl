var express = require('express');
var router = express.Router();
var passport = require('passport');
var requiresLogin = require('../requiresLogin');
var request = require('request');
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
    // res.render('dashboard', {user: req.user});
    res.redirect('/dashboard');
  });

router.get('/updateData', function(req, res, next) {
  getUser('/google-oauth2%7C107749376288480166720')
  res.redirect('/dashboard');
});

function getUser(userID){
    console.log('Starting to get user!');
    
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
}

function updateUser(userID, authToken){

}
module.exports = router;