import { type Request, type Response } from "express";
import * as AuthService from "../services/auth.service";
import { JWT_SECRET } from "../config/env";
import { logger } from "../config/logger";
logger.info("Auth controller");

export const getToken = async (req: Request, res: Response) => {
  logger.info("Generating token");
  const generateToken = AuthService.generateToken(
    { user: "test-user" },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  logger.info("Token generated", { token: generateToken });
  return res.json({ token: generateToken });
};
