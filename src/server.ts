import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/config';
import logger from './config/logger';

const httpServer = http.createServer(app);

// Start server
httpServer.listen(config.server.port, () => {
  logger.info(
    'SERVER',
    `Server running on ${config.server.hostname} ${config.server.port}`
  );
});

// Connect to MongoDB
mongoose.connect(config.mongo.url, config.mongo.options, (error) => {
  if (error) {
    logger.error('SERVER', error.message, error);
  }
  logger.info('SERVER', 'Mongo Connected');
});
