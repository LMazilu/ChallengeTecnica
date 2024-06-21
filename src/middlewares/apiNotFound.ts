import { Request, Response, NextFunction } from "express";

/**
 * Handles API routes that are not found.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
export const apiNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  logging.error(error);
  res.status(404);
  res.send(error.message);
};
