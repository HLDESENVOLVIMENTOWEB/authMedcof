import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = res.statusCode >= 400 && res.statusCode < 500 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;
