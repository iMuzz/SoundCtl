// This is the function that executes when the user hits 'login'
var lock = new Auth0Lock('jijBxKXRcQiGePE88KUM5Xrsf1kmK61u', 'soundctl.auth0.com');

function signin() {
  lock.show({
      callbackURL: 'http://localhost:3000/callback'
    , responseType: 'code'
    , authParams: {
      scope: 'openid name email picture'
    }
  });
}