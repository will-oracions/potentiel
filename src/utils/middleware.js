const logger = require('./logger');

const unknowEndpoint = (req, res) => {
  return res.status(404).json({ error: 'unknow endpoint' });
};

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer token')) {
    req.token = authorization.substring(7);
  }
  next();
}

const userExtractor = (req, res, next) => {
  const user = jwt.decode(req.token, process.env.JWT_SECRET);
  if (user.id) {
    req.user = user;
  }
  next();
}
  
const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
      return res.status(400).json({ error: 'malformated id ' });
  } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }

  logger.error(error.message);

  next();
}

module.exports = { 
    unknowEndpoint,
    errorHandler,
		requestLogger,
    tokenExtractor,
    userExtractor,
};