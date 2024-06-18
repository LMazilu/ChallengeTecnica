import { Request, Response, NextFunction } from "express";
import { InvalidCredentialsError } from "../errors/invalidCredentials";
import { NotFoundError } from "../errors/notFound";
import { UnauthorizedError } from "../errors/unauthorized";

const errorHandler = (
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
    return res.status(401).json({ message: err.message });
    }

  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
