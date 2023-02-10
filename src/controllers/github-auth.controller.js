const Router = require('express').Router();
const axios = require('axios')
const config = require('../config/app.config');

const clientID = config.GITHUB_CLIENT_ID;
const clientSecret = config.GITHUB_SECRET;

// console.log(clientID, clientSecret);

const GITHUB_URL = "https://github.com/login/oauth/access_token";

Router.get('/github/callback', (req, res) => {
    // console.log(res.query);
  const requestToken = req.query.code
  // res.json({query: req.query });
  axios({
    method: 'post',
    url: `${GITHUB_URL}?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    access_token = response.data.access_token
    // res.json({ response: response.data });
    // console.log('Access Token: ', access_token);
    res.redirect('/auth/success');
  })
  .catch((error) => {
    console.log('error: ', error);
    res.json({ error });
  })
});

Router.get('/success', function(req, res) {
  axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token
    }
  }).then((response) => {
    res.json({ userData: response.data });
  }).catch(error => {
    console.log(error);
    res.json(error);
  })
});

module.exports = Router;