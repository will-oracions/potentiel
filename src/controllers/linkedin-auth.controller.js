const Router = require('express').Router();
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const config = require('../config/app.config');
 
let userProfile;

passport.use(new LinkedInStrategy({
  clientID: config.LINKEDIN_OAUTH_CLIENT_ID,
  clientSecret: config.LINKEDIN_OAUTH_SECRET,
  callbackURL: "http://localhost:2023/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
//   process.nextTick(function () {
//     return done(null, profile);
//   });
    userProfile = profile;
    // console.log(profile);
    done(null, profile);
}));

Router.get('/',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

Router.get('/error', (req, res) => res.json({ error: "error logging in" }));
Router.get('/success', (req, res) => res.json(userProfile));

Router.get('/callback', passport.authenticate('linkedin', {
    successRedirect: '/auth/linkedin/success',
    failureRedirect: '/auth/linkedin/error'
}));

module.exports = Router;