const express = require('express');
require('express-async-errors');
const session = require('express-session');

const app = express();

const middleware = require('./utils/middleware');
const { connectToMongo } = require('./helpers/db.helper');
const githubAuthRouter = require('./controllers/github-auth.controller');
const tagRouter = require('./controllers/tags.controller');
const resourceRouter = require('./controllers/resources.controller');
const userRouter = require('./controllers/users.controller');
const googleAuthRouter = require('./controllers/google-auth.controller');
const linkedinAuthRouter = require('./controllers/linkedin-auth.controller');

connectToMongo();

app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET',
}));
app.use(middleware.requestLogger);
// app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor);


app.get('/', (req, res) => {
  res.send('<h1>Welcome to potentiel API</h1>');
});

app.use('/auth/github', githubAuthRouter);
app.use('/auth/google', googleAuthRouter);
app.use('/auth/linkedin', linkedinAuthRouter);

app.use('/api/tags', tagRouter);
app.use('/api/resources', resourceRouter);
app.use('/api/users', userRouter);

app.use(middleware.unknowEndpoint);
// app.use(middleware.errorHandler);

module.exports = app;