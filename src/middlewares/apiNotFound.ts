import { Request, Response, NextFunction } from "express";

export const apiNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  logging.error(error);
  res.status(404);
  res.send(error.message);
  next();
};
