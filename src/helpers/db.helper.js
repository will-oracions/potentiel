const mongoose = require('mongoose');
const config = require('../config/app.config');
const logger = require('../utils/logger');

const connectToMongo = async () => {
    logger.info('Connecting to ', config.MONGODB_URI)
    mongoose.set('strictQuery', false);
    mongoose.connect(config.MONGODB_URI)
      .then(() => logger.info('Connected to MongoDB'))
      .catch(err => logger.info('error connecting to MongoDB: ', err.message));
}

module.exports = { connectToMongo };