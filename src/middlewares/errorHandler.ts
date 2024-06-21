import { Request, Response, NextFunction } from "express";
import { InvalidCredentialsError } from "../errors/invalidCredentials";
import { NotFoundError } from "../errors/notFound";
import { UnauthorizedError } from "../errors/unauthorized";
import { AlreadyExistsError } from "../errors/alreadyExistsError";

/**
 * Error handling middleware that maps specific custom errors to appropriate HTTP responses.
 * 
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ message: err.message });
  }

  if (err instanceof InvalidCredentialsError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof AlreadyExistsError) {
    return res.status(409).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};
