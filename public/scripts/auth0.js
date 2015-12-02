// This is the function that executes when the user hits 'login'
var lock = new Auth0Lock('da8oL0bZSljscKr94Oq11W7P7AiTvb4L', 'soundctl.auth0.com');

function signin() {
  lock.show({
      callbackURL: 'http://alpha.soundctl.com/callback',
      responseType: 'code', 
      authParams: {
      scope: 'openid name email picture'
    }
  });
}