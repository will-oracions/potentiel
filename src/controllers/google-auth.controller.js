const Router = require('express').Router();
const axios = require('axios')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = require('../config/app.config');

let userProfile;

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: config.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: config.GOOGLE_OAUTH_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      console.log(accessToken, refreshToken);
      return done(null, userProfile);
  }
));
 
Router.get('/', passport.authenticate('google', { scope : ['profile', 'email'] }));
 
Router.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google/error' }),
    (req, res) => res.redirect('/auth/google/success'),
);


Router.get('/error', (req, res) => res.json({ error: "error logging in" }));
Router.get('/success', (req, res) => res.json(userProfile));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = Router;