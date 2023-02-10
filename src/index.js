const config = require('./config/app.config');
const http = require('http');
const logger = require('./utils/logger');
const app = require('./app');

const server = http.createServer(app);

server.listen(
    config.PORT, 
    () => logger.info(`Server is running on port ${config.PORT}`)
);
