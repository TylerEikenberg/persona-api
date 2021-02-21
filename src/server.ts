import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

const httpServer = http.createServer(app);

// Start server
httpServer.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});

// Connect to MongoDB
mongoose.connect(config.mongo.url, config.mongo.options, (error) => {
  if (error) throw error;
});
