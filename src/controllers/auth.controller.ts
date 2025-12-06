import { type Request, type Response } from "express";
import * as AuthService from "../services/auth.service";
import { JWT_SECRET } from "../config/env";

export const getToken = async (req: Request, res: Response) => {
  // Dummy token generation implementation
  const generateToken = AuthService.generateToken(
    { user: "test-user" },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return res.json({ token: generateToken });
};
