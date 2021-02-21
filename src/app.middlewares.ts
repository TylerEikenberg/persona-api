import { Request, Response, NextFunction, Errback } from 'express';

const rulesMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
};

// figure out error type here
const errorMiddleware = (
  _err: Errback,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).send('Not found.');
};

export { errorMiddleware as error, rulesMiddleware as rules };
