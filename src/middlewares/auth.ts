import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env";
import { logger } from "../config/logger";

logger.info("Auth middleware");

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.error("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    logger.error("Invalid token format");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    logger.error("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const secret = JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    logger.info("JWT verification successful", { decoded });
    req.user = decoded;

    next();
  } catch (error) {
    logger.error("JWT verification failed", { error });
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
