import { Request, Response, NextFunction } from "express";

/**
 * Middleware function to handle Cross-Origin Resource Sharing (CORS) headers.
 * @deprecated Use `cors` middleware instead.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 * @param {NextFunction} next - The next middleware function in the chain.
 * @return {void} This function does not return anything.
 */
export const corsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "*");

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET, OPTIONS"
    );
    return res.status(200).json({});
  }

  next();
};
