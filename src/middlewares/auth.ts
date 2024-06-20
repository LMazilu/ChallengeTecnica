import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  // Controlliamo se esiste il token (salvato tra i cookie per sicurezza)
  const cookie = req.cookies.accessToken;

  if (!cookie) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Da qui in poi sappiamo che il token è valido (o almeno, esiste) e lo passiamo al resto delle api.
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
    }
  req.decoded = decoded;
  next();
}
