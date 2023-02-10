const express = require('express');
require('express-async-errors');
const app = express();
const middleware = require('./utils/middleware');
const { connectToMongo } = require('./helpers/db.helper');
const githubAuthRouter = require('./controllers/github-auth.controller');
const tagRouter = require('./controllers/tags.controller');
const resourceRouter = require('./controllers/resources.controller');
const userRouter = require('./controllers/users.controller');

connectToMongo();

app.use(express.json());
app.use(middleware.requestLogger);
// app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor);

app.get('/', (req, res) => {
  res.send('<h1>Welcome. The Blog post app is running !!!</h1>');
});

app.use('/auth', githubAuthRouter);
app.use('/api/tags', tagRouter);
app.use('/api/resources', resourceRouter);
app.use('/api/users', userRouter);

app.use(middleware.unknowEndpoint);
app.use(middleware.errorHandler);

module.exports = app;