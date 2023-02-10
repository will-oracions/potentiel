const express = require('express');
// require('express-async-errors');
const app = express();
const middleware = require('./utils/middleware');
// const blogRouter = require('./controllers/blog');
// const usersRouter = require('./controllers/users');
// const loginRouter = require('./controllers/login');
const githubAuthRouter = require('./controllers/github-auth.controller');
// const { connectToMondo } = require('./helpers/db.helper');

// await connectToMondo();

app.use(express.json());
app.use(middleware.requestLogger);
// app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor);

app.get('/', (req, res) => {
  res.send('<h1>Welcome. The Blog post app is running !!!</h1>');
});

// app.use('/api/blogs', blogRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/login', loginRouter);
app.use('/auth', githubAuthRouter);

app.use(middleware.unknowEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

// localhost:3000/github/redirect
// ClientID: 79f614f47a73f58eaf91
// SecretID: 56153d607a080f98ae58b2b3a47be195da8da0dd

// https://github.com/login/oauth/authorize?client_id=79f614f47a73f58eaf91