import express from 'express';
import morgan from 'morgan';
import personaRoutes from './routes/route.personas';
import * as middlewares from './app.middlewares';

// Create Express server
const app = express();

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach middlewares
app.use(morgan('tiny'));
app.use(middlewares.rules);

//Routes
app.use('/', personaRoutes);

// Error handling
app.use(middlewares.error);

export default app;
